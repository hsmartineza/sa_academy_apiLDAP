import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	coursesMutations,
	coursesQueries,
	coursesTypeDef
} from './courses/typeDefs';
import {
	loginMutations,
	loginQueries,
	loginTypeDef
} from './login/typeDefs';

import coursesResolvers from './courses/resolvers';
import loginResolvers from './login/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		coursesTypeDef,
		loginTypeDef
	],
	[
		coursesQueries,
		loginQueries
	],
	[
		coursesMutations,
		loginMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		coursesResolvers,
		loginResolvers
	)
});
