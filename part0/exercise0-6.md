sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server-->>browser: application/json
    deactivate server
    
    Note right of browser: The browser  renders received list of notes