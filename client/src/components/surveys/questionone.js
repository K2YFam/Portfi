const json = {
  "title": "Charging Options",
  // "description": "Thank you for using PortFi! The smart charger for your EV needs.",
  "logoPosition": "right",
  "focusOnFirstError": false,
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question1",
      "title": "How would you like to begin your charging service?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Normal Charge Mode"
       },
       {
        "value": "Item 2",
        "text": "Roadtrip Charge Mode"
       },
       {
        "value": "Item 3",
        "text": "Pika Thunder Mode"
       }
      ]
     }
    ],
    // "title": "Charging Mode Setting",
    "description": "Please select a charging mode that best fits your current needs."
   },
   {
    "name": "page2",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question2",
      "title": "Pikachu use:",
      "choices": [
       {
        "value": "Item 1",
        "text": "Thunder Shock"
       },
       {
        "value": "Item 3",
        "text": "Quick Attack"
       }
      ]
     }
    ]
   }
  ],
  "triggers": [
   {
    "type": "complete"
   },
   {
    "type": "complete",
    "expression": "{question1} = 'Item 1' or {question1} = 'Item 2'"
   }
  ]
 };

  export default json;