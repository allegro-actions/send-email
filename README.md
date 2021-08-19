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

> HTML is allowed in body.

### Provide your own template and variables for template

```yaml
- uses: actions/checkout@v2
- uses: allegro-actions/send-email@v1
  with:
    subject: Awesome email!
    from: my-team@domain
    to: my-team@domain
    template: ./templates/my.html
    context: '{"name": "John"}'
```

> template file is compiled using handlebars.