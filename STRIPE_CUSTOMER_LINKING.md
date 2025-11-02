# Stripe Customer Linking Implementation

## Overview

This document explains how Stripe customers are linked to AWS Cognito users in the Fount application.

## Implementation Strategy

User information is linked **during checkout session creation** (before payment), ensuring that all Stripe webhook events contain the necessary metadata to identify the Cognito user.

## Data Flow

```
User clicks "Subscribe" 
  → Frontend extracts email + cognitoUserId from ID token
  → POST to /api/create-checkout-session with user info
  → Backend creates/updates Stripe customer with metadata
  → Backend creates checkout session linked to customer
  → User completes payment
  → Stripe webhooks fire with metadata
  → AWS backend receives webhooks with cognitoUserId
```

## Frontend Implementation

### 1. Extracting User Information

The frontend extracts user information from the Cognito ID token:

```typescript
// In Dashboard.tsx
const idToken = getIdToken();
const email = getEmailFromToken(idToken);        // User's email
const cognitoUserId = getUserSubFromToken(idToken); // Cognito 'sub' (unique user ID)
```

### 2. Creating Checkout Session

The frontend passes user information to the checkout API:

```typescript
// In src/config/stripe.ts
await createCheckoutSession(planType, email, cognitoUserId);
```

## Backend Implementation

### 1. Checkout Session Handler

Located in `api/create-checkout-session.ts`, the handler:

1. **Validates user information** - Ensures email and cognitoUserId are provided
2. **Creates or retrieves Stripe customer** - Checks if customer exists by email
3. **Attaches metadata to customer** - Stores `cognitoUserId` in customer metadata
4. **Creates checkout session** - Links session to the customer
5. **Attaches metadata to subscription** - Stores both `cognitoUserId` and `userEmail` in subscription metadata

```javascript
// Customer metadata
{
  cognitoUserId: "abc123-def456-ghi789" // Cognito user's 'sub'
}

// Subscription metadata
{
  cognitoUserId: "abc123-def456-ghi789",
  userEmail: "user@example.com"
}
```

## Webhook Event Structure

When your AWS backend receives Stripe webhook events, the metadata is available in multiple places:

### Event: `customer.subscription.created`

```javascript
{
  "type": "customer.subscription.created",
  "data": {
    "object": {
      "id": "sub_xxxxx",
      "customer": "cus_xxxxx",
      "status": "active",
      "metadata": {
        "cognitoUserId": "abc123-def456-ghi789",  // ← Available here
        "userEmail": "user@example.com"            // ← Available here
      },
      // ... other subscription fields
    }
  }
}
```

### Event: `customer.subscription.updated`

```javascript
{
  "type": "customer.subscription.updated",
  "data": {
    "object": {
      "id": "sub_xxxxx",
      "customer": "cus_xxxxx",
      "status": "active", // or "past_due", "canceled", etc.
      "metadata": {
        "cognitoUserId": "abc123-def456-ghi789",  // ← Available here
        "userEmail": "user@example.com"            // ← Available here
      },
      // ... other subscription fields
    }
  }
}
```

### Event: `customer.subscription.deleted`

```javascript
{
  "type": "customer.subscription.deleted",
  "data": {
    "object": {
      "id": "sub_xxxxx",
      "customer": "cus_xxxxx",
      "status": "canceled",
      "metadata": {
        "cognitoUserId": "abc123-def456-ghi789",  // ← Available here
        "userEmail": "user@example.com"            // ← Available here
      },
      // ... other subscription fields
    }
  }
}
```

### Accessing Customer Metadata

You can also retrieve the customer object to get metadata:

```javascript
// In your webhook handler
const subscription = event.data.object;
const customerId = subscription.customer;

// Fetch customer to get metadata
const customer = await stripe.customers.retrieve(customerId);
const cognitoUserId = customer.metadata.cognitoUserId;
```

## AWS Webhook Handler Implementation

Your AWS backend webhook handlers should extract the metadata like this:

```javascript
// Example webhook handler
async function handleSubscriptionEvent(event) {
  const subscription = event.data.object;
  
  // Extract metadata from subscription
  const cognitoUserId = subscription.metadata.cognitoUserId;
  const userEmail = subscription.metadata.userEmail;
  const stripeCustomerId = subscription.customer;
  const stripeSubscriptionId = subscription.id;
  const subscriptionStatus = subscription.status;
  
  // Now you can update your Cognito user or DynamoDB table
  await updateUserSubscription({
    cognitoUserId,
    userEmail,
    stripeCustomerId,
    stripeSubscriptionId,
    subscriptionStatus,
    currentPeriodEnd: subscription.current_period_end,
    priceId: subscription.items.data[0].price.id
  });
}
```

## Benefits of This Approach

1. **Early Linking** - User is linked before payment, no race conditions
2. **Persistent Metadata** - Metadata survives all subscription lifecycle events
3. **No Email Lookups** - Direct access to cognitoUserId without querying Cognito
4. **Idempotent** - If customer already exists, metadata is updated
5. **Reliable** - Works even if user closes browser during checkout

## Testing

To test the integration:

1. Sign in to the application
2. Navigate to Dashboard → Plan tab
3. Click "Subscribe" on Monthly or Yearly plan
4. Complete checkout in Stripe (use test card: 4242 4242 4242 4242)
5. Check your AWS webhook handler logs - you should see the metadata

## Metadata Fields Reference

| Field | Location | Description |
|-------|----------|-------------|
| `cognitoUserId` | Customer metadata | Cognito user's 'sub' (unique identifier) |
| `cognitoUserId` | Subscription metadata | Same as above, for convenience |
| `userEmail` | Subscription metadata | User's email address |

## Notes

- The `cognitoUserId` is the Cognito user's `sub` claim from the ID token
- This is a UUID that uniquely identifies the user in your Cognito User Pool
- The `userEmail` is included in subscription metadata for convenience
- Customer metadata persists across all subscriptions for that customer
- Subscription metadata is specific to each subscription

## Related Files

- `api/create-checkout-session.ts` - Checkout session creation with metadata
- `src/config/stripe.ts` - Frontend checkout function
- `src/pages/Dashboard.tsx` - User info extraction and checkout initiation
- `src/utils/jwtDecoder.ts` - JWT token decoding utilities
- `WEBHOOK_INTEGRATION_GUIDE.md` - General webhook integration guide

