const json = {
  "title": "Initial Charging Setup",
  "description": "Thank you for purchasing Portfi! The smart charger for your EV needs.",
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
     },
     {
      "type": "checkbox",
      "name": "question6",
      "title": "Favorite Bri-ish saying: (Select all that apply)",
      "choices": [
       {
        "value": "Item 1",
        "text": "Aloe Love"
       },
       {
        "value": "Item 2",
        "text": "Oit there mate, bit rude to put that knoife in me chest innit?"
       },
       {
        "value": "Item 3",
        "text": "Roight wots oll dis den?"
       },
       {
        "value": "Item 5",
        "text": "The Bee-ools"
       },
       {
        "value": "Item 6",
        "text": "Fank yew"
       },
       {
        "value": "Item 7",
        "text": "I'm not bovered"
       },
       {
        "value": "Item 8",
        "text": "Arry pah uh"
       },
       {
        "value": "Item 9",
        "text": "Peta Paka"
       }
      ]
     }
    ],
    "title": "Initial Mode Setting",
    "description": "Please select a charge mode that best fits your current needs."
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
        "value": "Item 2",
        "text": "Spark"
       },
       {
        "value": "Item 3",
        "text": "Quick Attack"
       }
      ]
     }
    ]
   },
   {
    "name": "page3",
    "elements": [
     {
      "type": "expression",
      "name": "question3",
      "title": "Pikachu has fried all the circuitry in your electric vehicle."
     }
    ]
   },
   {
    "name": "page4",
    "elements": [
     {
      "type": "expression",
      "name": "question4",
      "title": "Pikachu has fully charged your electric vehicle."
     }
    ]
   },
   {
    "name": "page5",
    "elements": [
     {
      "type": "expression",
      "name": "question5",
      "title": "Pikachu has put a dent in the side of your vehicle."
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
   },
   {
    "type": "skip",
    "expression": "{question2} = 'Item 1'",
    "gotoName": "question3"
   },
   {
    "type": "skip",
    "expression": "{question2} = 'Item 2'",
    "gotoName": "question4"
   },
   {
    "type": "skip",
    "expression": "{question2} = 'Item 3'",
    "gotoName": "question5"
   },
   {
    "type": "complete",
    "expression": "{question3} empty"
   },
   {
    "type": "complete",
    "expression": "{question4} empty"
   }
  ]
 };

  export default json;