const fs = require('fs');
const path = require('path');
const usersDataFilePath = path.join(__dirname, '../data/users.json')
const { DataTypes } = require('sequelize');
const db = require('../database/models');


const User = {
    async getData(){
        return JSON.parse(fs.readFileSync(usersDataFilePath, 'utf-8'))
    },
    async generateId(){
        let allUsers = await this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },
    async findAll(){
        return this.getData();
    },
    async findByPk(id){
        let allUsers = await this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound;
    },
    async findByField(field, text){
        let allUsers = await this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },
    async create(userData){
        let allUsers = await this.findAll();
        let newUser = {
            id: await this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(usersDataFilePath, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    async delete(id){
        let allUsers = await this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(usersDataFilePath, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User;