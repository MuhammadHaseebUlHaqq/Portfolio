# Conventional Commits Guide

A specification for adding human and machine readable meaning to commit messages.

## Quick Reference

### Basic Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Common Types
- `feat`: New feature (correlates with MINOR in SemVer)
- `fix`: Bug fix (correlates with PATCH in SemVer)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, etc.
- `ci`: CI/CD changes
- `build`: Build system changes

## Examples

### Simple Commit
```
feat: add user authentication system
```

### Commit with Scope
```
fix(auth): resolve login token expiration issue
```

### Breaking Change with !
```
feat!: remove deprecated API endpoints

BREAKING CHANGE: The following endpoints have been removed:
- /api/v1/users/old
- /api/v1/posts/legacy
```

### Commit with Body and Footer
```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

### Documentation Update
```
docs: update API documentation for v2.0
```

### Style Changes
```
style: format code according to prettier standards
```

### Test Addition
```
test: add unit tests for user authentication
```

## Breaking Changes

### Method 1: Using ! in Type
```
feat!: send email notification on order completion
```

### Method 2: Using BREAKING CHANGE Footer
```
feat: send email notification on order completion

BREAKING CHANGE: Email service configuration is now required
```

### Method 3: Both ! and Footer
```
feat!: send email notification on order completion

BREAKING CHANGE: Email service configuration is now required
```

## Scopes

Scopes provide additional context about which part of the codebase is affected:

```
feat(api): add new user endpoint
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
test(auth): add login validation tests
```

## Body and Footers

### Body
- Must begin one blank line after description
- Free-form text with multiple paragraphs allowed
- Provides additional context about changes

### Footers
- Must begin one blank line after body
- Format: `token: value` or `token #value`
- Common tokens: `Reviewed-by`, `Refs`, `Fixes`, `Closes`

## Best Practices

1. **Be Consistent**: Use the same casing throughout your project
2. **Be Descriptive**: Write clear, concise descriptions
3. **Use Imperative Mood**: "add feature" not "added feature"
4. **Keep it Short**: Description should be under 50 characters
5. **Use Scopes**: When helpful to identify affected area
6. **Separate Concerns**: Make multiple commits for different changes

## Common Mistakes to Avoid

❌ `updated the login system`
✅ `feat(auth): implement new login system`

❌ `fixes bug`
✅ `fix: resolve user session timeout issue`

❌ `WIP: working on feature`
✅ `feat: add user dashboard (WIP)`

## Integration with SemVer

- `fix` commits → PATCH version bump
- `feat` commits → MINOR version bump
- `BREAKING CHANGE` → MAJOR version bump

## Tools and Automation

Conventional Commits enable:
- Automatic CHANGELOG generation
- Semantic versioning
- Automated release processes
- Better project documentation

## FAQ

**Q: What if I make a mistake in the commit type?**
A: Use `git rebase -i` to edit before merging. After release, follow your team's process.

**Q: Do all contributors need to follow this?**
A: No! Lead maintainers can clean up commit messages during merge/squash.

**Q: How to handle revert commits?**
A: Use `revert` type with footer referencing the reverted commit SHA:
```
revert: let us never again speak of the noodle incident

Refs: 676104e, a215868
```

---

*This guide is based on the [Conventional Commits 1.0.0 specification](https://www.conventionalcommits.org/).* 