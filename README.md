# allegro-actions/send-email

This action sends email using company email provider.

## Basic usage:

### Default template

```yaml
- uses: allegro-actions/send-email@v1
  with:
    subject: Awesome email!
    from: my-team@domain
    to: my-team@domain
    body: Hello, world!
```

### Provide your own template and variables for template

```yaml
- uses: allegro-actions/send-email@v1
  with:
    subject: Awesome email!
    from: my-team@domain
    to: my-team@domain
    template: ./templates/my.html
    context: '{"name": "John"}'
```