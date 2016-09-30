# Node.js Examples

Here we have put together a hand full of Node.js examples to help get you started. As always feel free to [contact us](https://lob.com/support) directly if you have any questions on implementation.

## Getting started
Before running these examples make sure you are in the `examples/` directory.
```
cd examples/
```

## Examples

### Create letters from CSV

An example showing how to validate and clean addresses from a CSV spreadsheet full of mailing addresses using Lob's [Address Verification API](https://lob.com/verification/address) and then using the clean, valid addresses to dynamically create sample billing letters with variable data using Lob's [Letter API](https://lob.com/services/letters).

In order to run the program enter:

```
cd verify_and_create_letters_from_csv/
node index.js
```

### Create postcards from CSV

An example showing how to dynamically create postcards from a CSV using HTML, a custom font, variable data, and Lob's [Postcard API](https://lob.com/services/postcards).

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
