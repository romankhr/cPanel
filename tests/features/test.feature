Feature: cPanel test

    @ui
    @smoke
    @cPanel-001
    Scenario: Order product test
        Given User opens cPanel Home Page
        Then Verify that user redirects to Home Page
        When User chooses 1 product to order on Home Page
        Then Verify that user redirects to Account Page
        When Save Total Due Today price on Account Page
        And User chooses 1 addon on Account Page
        And User enters "random" IP Address on Account Page
        Then Verify the "Order Summary" is updated on Account Page
        When User clicks Continue button on Account Page
        Then Verify the expected addons is present in Step 2 Review & Checkou on Account Page
        Then Verify the addons price is correct in Step 2 Review & Checkou on Account Page
        When User clicks Checkout button on Account Page
        Then Verify "cPanel Solo® Cloud (1 Account)" is correct on Account Page
        Then Verify "Monthly CloudLinux" is correct on Account Page
        Then Verify IP address on Account Page
        Then Verify 'saved' Bonus: The “Due Today“ price on Account Page
        Then Verify the 'Personal Information' is displayed on Account Page
        Then Verify the 'Billing Address' is displayed on Account Page
        Then Verify the 'Account Security' is displayed on Account Page
        Then Verify the 'Payment Details' is displayed on Account Page
        Then Verify the 'Complete Order' Button is displayed and is Disabled on Account Page