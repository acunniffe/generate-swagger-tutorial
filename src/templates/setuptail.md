# Verify Integration
Before we continue, let's take a moment to make sure everything is set up properly. You can run `optic setup:tests` to verify that:
- Optic's documenting middleware has been included correctly
- the `optic.yml` is configured to run your API tests properly

```bash
$ optic setup:tests

  Listening for API interactions in your tests... done

  Observed >= 1 API Interactions. Your test setup is valid
```

All setup? Nice work! Let's document your API now. 

# Document the API
Now that you've added Optic to your API, you can run the document command anytime to get the current contract of the API and generate a Swagger specification.

```bash
$ optic api:document --generate oas
```

The OAS Spec will be generated in `.optic/oas`. 

# That's it!
If this tutorial helped you check out [Optic's Website](https://useoptic.com) and our [GitHub](https://github.com/opticdev) to learn more about our other tools. 
