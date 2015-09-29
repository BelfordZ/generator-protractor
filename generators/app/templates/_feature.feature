Feature: <%= featureName %>
  As a <%= featureContext %>
  I want to <%= featureContents %>
  So that I can <%= featureGoals %>
  <% featureContentsArray.forEach(function(content) { %>
  @regression
  @<%= featureFileName %>
  @<%= featureFileName %>-<%= content.contentTag %>
  Scenario: <%= content.content %>
    Given I get to the right state
    Then I should see <%= content.content %>
  <% }); %>
