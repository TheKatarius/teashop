---
name: add-mock-endpoint
description: Add a new HTTP endpoint to the .NET mock backend (api/TeaShop.Api) and a matching TanStack Query hook on the frontend. Use when the user asks to "add an endpoint", "expose API for X", "mock backend for X", or "/add-mock-endpoint".
---

# add-mock-endpoint

Add a new endpoint to the ASP.NET Core minimal API in `api/TeaShop.Api/` and the matching frontend TanStack Query hook in `web/src/features/<feature>/api.ts`.

## When to invoke
- User asks to add / expose an API endpoint, or to mock a backend route.
- User types `/add-mock-endpoint <METHOD> <path> <resource>`.

## Args
`/add-mock-endpoint <METHOD> <path> <resource>` — e.g.
- `/add-mock-endpoint GET /api/products/{slug}/reviews reviews`
- `/add-mock-endpoint POST /api/cart/items cart`

If any arg is missing, ask one question to collect all three. `<resource>` is the feature folder name on both sides (`features/<resource>/` and `Endpoints/<Resource>Endpoints.cs`).

## Procedure

### 1. Locate or create the endpoint group file
File: `api/TeaShop.Api/Endpoints/<Resource>Endpoints.cs` (PascalCase). If it doesn't exist, create it with this shape:

```csharp
namespace TeaShop.Api.Endpoints;

public static class <Resource>Endpoints
{
    public static void Map<Resource>Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/<resource>").WithTags("<Resource>");

        // endpoints added here
    }
}
```

Then ensure `Program.cs` calls `app.Map<Resource>Endpoints();` exactly once (idempotent — check first).

### 2. Add the handler
Append a `group.Map<Verb>(...)` registration. Handler delegates do **one thing**: validate → call repo/service → return `Results.*`. No business logic inline.

```csharp
group.MapGet("/{slug}/reviews", async (
    string slug,
    IProductRepository products,
    IReviewRepository reviews,
    CancellationToken ct) =>
{
    var product = products.FindBySlug(slug);
    if (product is null) return Results.NotFound();

    var items = reviews.ListByProduct(product.Id);
    return Results.Ok(items.Select(ReviewDto.From));
})
.WithName("Get<Resource><Verb>")
.Produces<IEnumerable<ReviewDto>>()
.Produces(StatusCodes.Status404NotFound);
```

For protected endpoints, append `.RequireAuthorization()`.

### 3. DTOs go in `Endpoints/Dtos/`
Use `record` types with `From(domain)` static mappers. Never return domain types directly.

### 4. Seed data
If the endpoint reads data, ensure `api/TeaShop.Api/SeedData/<resource>.json` exists and the repository loads it at startup. If a new field is needed on existing seed records, update **all** records in the file — no nulls.

### 5. Smoke-test
Run `dotnet build` to ensure the project still compiles. If a test project exists, add a happy-path test for the endpoint to `api/TeaShop.Api.Tests/<Resource>EndpointsTests.cs` using `WebApplicationFactory<Program>`.

### 6. Add the frontend hook
File: `web/src/features/<resource>/api.ts`. Append a typed query or mutation:

```ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import type { Review } from '@/types';

export function useProductReviews(slug: string) {
  return useQuery({
    queryKey: ['reviews', slug],
    queryFn: () => apiClient.get<Review[]>(`/products/${slug}/reviews`),
    enabled: Boolean(slug),
  });
}
```

For mutations, invalidate the affected query keys in `onSuccess`. Never call `fetch` directly — always go through `apiClient`.

### 7. Mirror types
If the DTO introduces a new shape, add it to `web/src/types/<resource>.ts`. Keep the TS type aligned with the C# DTO field-for-field (camelCase on the wire — ASP.NET's default `JsonSerializerOptions` already lowercases).

### 8. Report
List:
- the C# file(s) created/modified,
- the seed file touched,
- the frontend hook added,
- a curl example the user can paste into Swagger to verify.

## Hard rules
- Endpoint paths under `/api/` always. Use kebab-case for multi-word segments (`/mood-tags`).
- Handler delegates ≤ ~20 lines; extract to a service when longer.
- Return `Results.ValidationProblem(...)` for bad input — never throw.
- Async only when there's real I/O. Don't `await Task.FromResult(...)` ceremoniously.
- Frontend never imports from the backend project; the JSON contract is the boundary.
- Don't bypass `apiClient` on the frontend.
