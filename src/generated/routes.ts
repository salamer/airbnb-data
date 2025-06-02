/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HouseController } from './../house.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InteractionController } from './../interaction.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../auth.controller';
import { expressAuthentication } from './../auth.middleware';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "HouseResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "caption": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "price": {"dataType":"double","required":true},
            "address": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "zipCode": {"dataType":"string","required":true},
            "size": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "userId": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "avatarUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "hasLiked": {"dataType":"boolean","required":true},
            "hasOrdered": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateHouseBase64Input": {
        "dataType": "refObject",
        "properties": {
            "imageBase64": {"dataType":"string","required":true},
            "imageFileType": {"dataType":"string","required":true},
            "caption": {"dataType":"string"},
            "price": {"dataType":"double","required":true},
            "address": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "zipCode": {"dataType":"string","required":true},
            "size": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserProfileResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "bio": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "avatarUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserOrdersResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "caption": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "price": {"dataType":"double","required":true},
            "address": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "zipCode": {"dataType":"string","required":true},
            "size": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "userId": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "avatarUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "hasLiked": {"dataType":"boolean","required":true},
            "hasOrdered": {"dataType":"boolean","required":true},
            "startDate": {"dataType":"datetime"},
            "endDate": {"dataType":"datetime"},
            "totalPrice": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "startDate": {"dataType":"datetime"},
            "endDate": {"dataType":"datetime"},
            "totalPrice": {"dataType":"double"},
            "userId": {"dataType":"double","required":true},
            "houseId": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "avatarUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "houseImageUrl": {"dataType":"string","required":true},
            "houseCaption": {"dataType":"string","required":true},
            "houseCity": {"dataType":"string","required":true},
            "houseState": {"dataType":"string","required":true},
            "houseAddress": {"dataType":"string","required":true},
            "houseZipCode": {"dataType":"string","required":true},
            "houseSize": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrderInput": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsHouseController_createHouse: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateHouseBase64Input"},
                badRequestResponse: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/houses',
            ...(fetchMiddlewares<RequestHandler>(HouseController)),
            ...(fetchMiddlewares<RequestHandler>(HouseController.prototype.createHouse)),

            async function HouseController_createHouse(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHouseController_createHouse, request, response });

                const controller = new HouseController();

              await templateService.apiHandler({
                methodName: 'createHouse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHouseController_getFeedHouses: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                offset: {"default":0,"in":"query","name":"offset","dataType":"double"},
        };
        app.get('/api/v1/houses',
            ...(fetchMiddlewares<RequestHandler>(HouseController)),
            ...(fetchMiddlewares<RequestHandler>(HouseController.prototype.getFeedHouses)),

            async function HouseController_getFeedHouses(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHouseController_getFeedHouses, request, response });

                const controller = new HouseController();

              await templateService.apiHandler({
                methodName: 'getFeedHouses',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHouseController_searchHouses: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                query: {"in":"query","name":"query","required":true,"dataType":"string"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                offset: {"default":0,"in":"query","name":"offset","dataType":"double"},
                state: {"default":"","in":"query","name":"state","dataType":"string"},
                city: {"default":"","in":"query","name":"city","dataType":"string"},
                zipCode: {"default":"","in":"query","name":"zipCode","dataType":"string"},
                badRequestResponse: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/houses/search',
            ...(fetchMiddlewares<RequestHandler>(HouseController)),
            ...(fetchMiddlewares<RequestHandler>(HouseController.prototype.searchHouses)),

            async function HouseController_searchHouses(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHouseController_searchHouses, request, response });

                const controller = new HouseController();

              await templateService.apiHandler({
                methodName: 'searchHouses',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHouseController_getHouseById: Record<string, TsoaRoute.ParameterSchema> = {
                houseId: {"in":"path","name":"houseId","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/houses/:houseId',
            ...(fetchMiddlewares<RequestHandler>(HouseController)),
            ...(fetchMiddlewares<RequestHandler>(HouseController.prototype.getHouseById)),

            async function HouseController_getHouseById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHouseController_getHouseById, request, response });

                const controller = new HouseController();

              await templateService.apiHandler({
                methodName: 'getHouseById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserProfile: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                notFound: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/users/:userId/profile',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserProfile)),

            async function UserController_getUserProfile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserProfile, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserProfile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserOrders: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/v1/users/:userId/orders',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserOrders)),

            async function UserController_getUserOrders(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserOrders, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserOrders',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserLikes: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
        };
        app.get('/api/v1/users/:userId/likes',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserLikes)),

            async function UserController_getUserLikes(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserLikes, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserLikes',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_likeHouse: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                houseId: {"in":"path","name":"houseId","required":true,"dataType":"double"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/houses/:houseId/like',
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.likeHouse)),

            async function InteractionController_likeHouse(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_likeHouse, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'likeHouse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_unlikeHouse: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                houseId: {"in":"path","name":"houseId","required":true,"dataType":"double"},
        };
        app.delete('/api/v1/houses/:houseId/unlike',
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.unlikeHouse)),

            async function InteractionController_unlikeHouse(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_unlikeHouse, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'unlikeHouse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_createOrder: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                houseId: {"in":"path","name":"houseId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateOrderInput"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/houses/:houseId/orders',
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.createOrder)),

            async function InteractionController_createOrder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_createOrder, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'createOrder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_getOrders: Record<string, TsoaRoute.ParameterSchema> = {
                houseId: {"in":"path","name":"houseId","required":true,"dataType":"double"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                offset: {"default":0,"in":"query","name":"offset","dataType":"double"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/houses/:houseId/orders',
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.getOrders)),

            async function InteractionController_getOrders(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_getOrders, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'getOrders',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
