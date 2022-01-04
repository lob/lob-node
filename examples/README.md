# Node.js Examples

Here we have put together a hand full of Node.js examples to help get you started. Please read through the official [API Documentation](https://docs.lob.com/) to get a complete sense of what to expect from each endpoint. As always, feel free to [contact us](https://lob.com/support) directly if you have any questions on implementation.

There are a number of different examples of postcard requests which illustrate different cases, such as making an idempotent request or sending to
an international address.

## Getting started
Before running these examples make sure you are in the `examples/` directory.
```
cd examples/
```

## Examples

### Verify and create letters from CSV

An example showing how to validate and clean addresses from a CSV spreadsheet full of mailing addresses using Lob's [US Address Verification API](https://lob.com/services/verifications) and then using the clean, valid addresses to dynamically create sample billing letters with merge variables using Lob's [Letter API](https://lob.com/services/letters).

Please note that if you are running this with a Test API Key, the verification API will always return [a dummy address](https://docs.lob.com/#section/US-Verifications-Test-Env).

In order to run the program enter:

```
cd verify_and_create_letters_from_csv/
node index.js
```

### Create postcards from CSV

An example showing how to dynamically create postcards from a CSV using HTML, a custom font, merge variables, and Lob's [Postcard API](https://lob.com/services/postcards).

In order to run the program enter:

```
cd create_postcards_from_csv/
node index.js
```

### Create a card
```
node create_card.js
```

### Create a card order
```
node create_cardOrder.js
```

### Create a check
```
node create_check.js
```

### Create a letter
```
node create_letter.js
```

### Create a postcard
```
node create_postcard.js
```

### Create an international postcard
```
node create_postcard_intl.js
```

### Create an idempotent postcard request
```
node create_postcard_idempotent.js
```

### Create a postcard with metadata
```
node create_postcard_metadata.js
```

### Create a postcard with remote files
```
node create_postcard_remote.js
```

### Create a postcard with a send date specified
```
node create_postcard_send_date.js
```

### Create a postcard using saved HTML templates
```
node create_postcard_template.js
```

### Create a self mailer
```
node create_self_mailer.js
```

### Create an HTML template and use that template to create a postcard

```
node create_template.js
```
