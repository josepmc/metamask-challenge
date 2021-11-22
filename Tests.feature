Feature: User signup
    These tests relate to the basic signup functionality available on the application

    @should-be-unit-tested
    Scenario Outline: RFC-822 Compliant emails are supported
        This scenario should be covered as a unit test rather than having it as an e2e test, as it does only test the functionality of the validateEmail function.
        Given I open the application
        And I navigate to the signup page
        When I input the email "<email>" and password "test123456789"
        And I confirm the signup
        Then I should be signed up
        Examples:
            | email                 |
            | test@example.com      |
            | test.test@example.com |
            | test@example.com.     |
            | test@example.co.uk    |
            | test@192.192.192.192  |
            | test@abc-abc.ex       |
            # The following examples are not supported by this application
            # Reason being is that we’re using \w and .- as regex for the local part. This includes alphanumerical characters, underscore and asterisk but is missing the following accepted special characters: ! # $ % & ‘ + / = ? ^ _ ` . { | } ~
            | test+test@example.com |
            | test!test@example.com | # or any other character from the special characters list above | test-@example.com |
            | test@localhost        |
    # UTF-8 characters aren’t supported by \w *if not used in conjunction with the u flag*, hence the following will also fail

    @should-be-unit-tested
    Scenario Outline: Non RFC-822 emails are rejected
        This scenario should be covered as a unit test rather than having it as an e2e test, as it does only test the functionality of the validateEmail function.
        Given I open the application
        And I navigate to the signup page
        When I input the email "<email>" and password "test123456789"
        And I confirm the signup
        Then I should see an email validation error
        Examples:
            | email                                                                                                                                                                                                                                                                     |
            | test.@example.com                                                                                                                                                                                                                                                         |
            | .test@example.com                                                                                                                                                                                                                                                         |
            | .test@example.c                                                                                                                                                                                                                                                           |
            | test@192.192.192.192.1                                                                                                                                                                                                                                                    |
            | test@-abc.com                                                                                                                                                                                                                                                             |
            | test@abc.com-                                                                                                                                                                                                                                                             |
            # The following is not detected as invalid
            # Local part can have a maximum of 64 characters
            | 12345678901234567890123456789012345678901234567890123456789012345@example.com                                                                                                                                                                                             |
            # Domain part can have a maximum of 255 characters
            | test@nsASNrrEBsdzj61wlhUWFnaNhxncoAecsD6TNRR96MJkzAHB8xObzki3cuNM5nzHtGl5XjiTvdqrZtUiAwv0XIEM18YTE6pswWuImK0QJM2QeFYAOFxC6KYQuMX6J4Li8i5G1Pa4PGs8pl7Nmstl0gjFV8MZjoqQxd7pMtFurGbQBkk6F9DEUJJSeCwRUvIGoTy12YhshgiUh8827DlLeZ6XnH9PJGXTrWCm1ZrMLQry1tYeFoJq4L968T8rZ9U4.com |

    @should-be-unit-tested
    Scenario Outline: Empty values are rejected with a custom error message
        Given I open the application
        And I navigate to the signup page
        When I input a valid "<field type>"
        And I confirm the signup
        Then I should see an empty <validation error field> validation error
        Examples:
            | field type | validation error field |
            | password   | email                  |
            | email      | password               |
            |            | email,password         |

    @should-be-unit-tested
    Scenario: Password field can’t be less than 12 characters
        Given I open the application
        And I navigate to the signup page
        When I input the email "test@example.com" and password "test"
        And I confirm the signup
        Then I should see a password length validation error

    @e2e
    Scenario: User can’t signup with invalid signup data
        This is a valid e2e scenario as we’re testing the flow on its own, and ensuring that we are not proceeding to the next screen in case of validation errors. The tests before this would be only testing the validation functionalities as per se (so there wouldn’t be a device started).
        Given I open the application
        And I navigate to the signup page
        When I input the email "test@e.x" and password "test"
        And I confirm the signup
        Then I should see validation errors for "email,password"

    @e2e
    Scenario: User can signup successfully
        This is a valid e2e scenario as we’re testing the flow on its own, and ensuring that we are proceeding to the next screen upon successful signup.
        Given I open the application
        And I navigate to the signup page
        When I input the email "test@example.com" and password "test1234756789"
        And I confirm the signup
        Then I should be on the home screen
        And I should see the email address "test@example.com" on the home screen

    # Following Scenarios are meant to be part of a fully functional signup flow, but won’t work in this basic implementation

    @e2e @feature-not-implemented
    Scenario: User can’t navigate back to the signup screen once signed up
        This is a valid e2e scenario as we’re testing the flow on its own, and ensuring that we are proceeding to the next screen upon successful signup.
        Given I signup successfully as a new user # Combines together the previous scenario
        When I should be on the home screen
        Then I shouldn’t be able to go back to the home screen

    @e2e @android-only @feature-not-implemented
    Scenario: User can’t navigate back to the signup screen once signed up using the back button
        This is a valid e2e scenario as we’re testing the flow on its own, and ensuring that we are proceeding to the next screen upon successful signup.
        Given I signup successfully as a new user # Combines together the previous scenario
        And I should be on the home screen
        When I press the back button
        Then I should see the dashboard and the application should be in the background

    @e2e @feature-not-implemented
    Scenario: Signed-up user persists when the application is closed
        This is a valid e2e scenario as we’re testing the flow on its own, and ensuring that we are proceeding to the next screen upon successful signup.
        Given I signup successfully as a new user # Combines together the previous scenario
        When I am on the home screen
        And I close the application completely # e.g. not sent to the background
        And I open the application
        Then I should be on the home screen
        Then I should see the email address "test@example.com" on the home screen
