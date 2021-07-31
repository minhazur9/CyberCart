require('dotenv').config()
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')

const server = new ApolloServer({})