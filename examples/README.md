# Node.js Examples

Here we have put together a hand full of Node.js examples to help get you started. Please read through the official [API Documentation](../README.md#api-documentation) to get a complete sense of what to expect from each endpoint. As always, feel free to [contact us](https://lob.com/support) directly if you have any questions on implementation.

## Getting started
Before running these examples make sure you are in the `examples/` directory.
```
cd examples/
```

## Examples

### Verify and create letters from CSV

An example showing how to validate and clean addresses from a CSV spreadsheet full of mailing addresses using Lob's [US Address Verification API](https://lob.com/services/verifications) and then using the clean, valid addresses to dynamically create sample billing letters with merge variables using Lob's [Letter API](https://lob.com/services/letters).

Please note that if you are running this with a Test API Key, the verification API will always return [a dummy address](https://lob.com/docs#us_verifications_create).

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

### Create a self mailer
```
node create_self_mailer.js
```
