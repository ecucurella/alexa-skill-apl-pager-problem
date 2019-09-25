// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const Datos = require("./datos.json");
const Programa = require("./programa.json");


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, vamos a probar el paginador';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addDirective({
                type : 'Alexa.Presentation.APL.RenderDocument',
                token: "Directe",
                document : Programa,
                datasources: Datos
            })
            .addDirective({
                type: "Alexa.Presentation.APL.ExecuteCommands",
                token: "Directe",
                commands: [{
                    type: "AutoPage",
                    componentId: "DirectePager",
                    duration: 5000
                }]
            })
            .getResponse();
    }
};

const PruebaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PruebaIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, vamos a volver a probar el paginador';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addDirective({
                type : 'Alexa.Presentation.APL.RenderDocument',
                token: "Directe",
                document : Programa,
                datasources: Datos
            })
            .addDirective({
                type: "Alexa.Presentation.APL.ExecuteCommands",
                token: "Directe",
                commands: [{
                    type: "AutoPage",
                    componentId: "DirectePager",
                    duration: 5000
                }]
            })
            .getResponse();
    }
};


const PageEventHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent';
            //&& (handlerInput.requestEnvelope.request.source.handler === 'onPageChanged' 
            //    || handlerInput.requestEnvelope.request.source.handler === 'PageChanged'
            //     || handlerInput.requestEnvelope.request.source.handler === 'Page');
    },
    handle(handlerInput) {
        console.log('handlerInput.requestEnvelope.request.source.handler: ' + handlerInput.requestEnvelope.request.source.handler);
        console.log('Arguments 0: ' + handlerInput.requestEnvelope.request.arguments[0] + ' Arguments 1: ' + handlerInput.requestEnvelope.request.arguments[1]);
        return handlerInput.responseBuilder
            .speak('Enhorabuena, el evento ha saltado correctamente !!')
            .getResponse();            
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Texto de ayuda';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adios!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PageEventHandler,
        PruebaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
