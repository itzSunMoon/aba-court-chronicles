# Remove all location text from the ABA website

## Goal
Strip every city and country reference from all pages/tabs so team names stand alone without location labels.

## What will change

### Data source
- `src/lib/mock-data.ts`
  - Set every team's `country` to an empty string.
  - Keep `city` as-is (already cleared to `\n` for most teams, `i` for Taipei) since the UI will no longer render it.
  - Rewrite the news article summary that mentions "Manila's first-round pick" to a generic location-free sentence.

### Components
- `src/components/TeamCard.tsx`
  - Remove the `{team.city}, {team.country}` subtitle line.

### Routes
- `src/routes/standings.tsx`
  - Remove the city sub-label under the team name in the standings table.
- `src/routes/teams.$slug.tsx`
  - Remove `{team.city}, {team.country}` from the team hero section.
  - Remove the same location line from the stadium/venue card.
  - Rewrite the route `meta` description so it no longer references the team's city.
- `src/routes/contact.tsx`
  - Remove or replace the Singapore office address line with a generic contact method.
- `src/routes/privacy.tsx`
  - Remove the "Singapore office" reference in the Contact Information section.

## Out of scope
- Team slugs (e.g., `tokyo-thunder`) and arena names remain unchanged.
- Conference labels (East/West) remain unchanged.

## Verification
- Build the project and visually confirm no city, country, or location address text appears on Teams, Standings, Team Detail, Contact, or Privacy pages.
