const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const core = require('../../lib')

describe('user use cases', () => {

  describe('createUser use case', () => {

    let createUserCalled = false
    let createdUser = {}
    const usernames = []
    const createUser = user => {
      createUserCalled = true
      createdUser = user
      usernames.push(user.userName)
    }

    let isUserNameUniqueCalled = false
    let isUserNameUniqueArg = ""
    const isUserNameUnique = userName =>{
      isUserNameUniqueCalled = true
      isUserNameUniqueArg = userName
      return !usernames.includes(userName)
    }

    let hashPasswordCalled = false
    let hashPasswordPassedArg = ""
    const hashPassword = password => {
      hashPasswordCalled = true
      hashPasswordPassedArg = password
      return "hashedPassword"
    }

    const userName = "testUser"
    const password = "password"
    const user = core.createUserUseCase(isUserNameUnique)(createUser)(hashPassword)(userName, password)

    describe('happy path', () => {

      it('should create a function after createUser is injected', () => {
        core.createUserUseCase(isUserNameUnique)(createUser).should.be.a('function')
      })

      it('should call isUserNameUnique injected dependency', () => {
        isUserNameUniqueCalled.should.equal(true)
      })

      it('should pass userName to isUserNameUnique', () => {
        isUserNameUniqueArg.should.equal(userName)
      })

      it('should call hashPassword injected dependency', () => {
        hashPasswordCalled.should.equal(true)
      })

      it('should pass password to hashPassword dependency', () => {
        hashPasswordPassedArg.should.equal(password)
      })

      it('should call createUser injected dependency', () => {
        createUserCalled.should.equal(true)
      })

      it('should pass created user to createUser', () => {
        createdUser.should.deep.equal(user)
      })

      it('should return an object', () => {
        user.should.be.an('object')
      })

      it('should have string property id', () => {
        user.should.have.property('id')
        user.id.should.be.a('string')
      })

      it('should generate unique ids', () => {
        const user2 = core.createUserUseCase(isUserNameUnique)(createUser)(hashPassword)('testUser2', 'password')
        user2.id.should.not.equal(user.id)
      })

      it('should have string property userName', () => {
        user.should.have.property('userName')
        user.userName.should.be.a('string')
      })

      it('should set userName equal to userName arg', () => {
        user.userName.should.equal(userName)
      })

      it('should have string property hashedPassword', () => {
        user.should.have.property('hashedPassword')
        user.hashedPassword.should.be.a('string')
      })

      it('should not have password saved in cleartext', () => {
        user.hashedPassword.should.not.equal(password)
      })

    })

    describe('error path', () => {

      describe('when isUserNameUnique is not a func', () => {
        it('should throw a type error', () => {
          expect(() => core.createUserUseCase("isUserNameUnique")).to.throw(TypeError)
        })
      })

      describe('when createUser is not a func', () => {
        it('should throw a type error', () => {
          expect(core.createUserUseCase(isUserNameUnique)("createUser")(hashPassword)).to.throw(TypeError)
        })
      })

      describe('when hashPassword is not a func', () => {
        it('should throw a type error', () => {
          expect(core.createUserUseCase(isUserNameUnique)(createUser)("hashPassword")).to.throw(TypeError)
        })
      })

      describe('when userName is the wrong type', () => {
        it('should throw a type error', () => {
          expect(() => core.createUserUseCase(isUserNameUnique)(createUser)(hashPassword)(1, password)).to.throw(TypeError)
        })
      })

      describe('when userName is not unique', () => {
        it('should throw an error', () => {
          expect(() => core.createUserUseCase(isUserNameUnique)(createUser)(hashPassword)(userName, password)).to.throw()
        })
      })

      describe('when password is the wrong type', () => {
        it('should throw a type error', () => {
          expect(() => core.createUserUseCase(isUserNameUnique)(createUser)(hashPassword)(userName, 1)).to.throw(TypeError)
        })
      })

      describe('when isUserNameUnique fails', () => {
        it('should throw an error', () => {
          const badIsUsernameUnique = () => {throw new Error}
          expect(() => core.createUserUseCase(badIsUsernameUnique)(createUser)(hashPassword)(userName, password)).to.throw()
        })
      })

      describe('when createUser fails', () => {
        it('should throw an error', () => {
          const badCreateUser = () => {throw new Error}
          expect(() => core.createUserUseCase(isUserNameUnique)(badCreateUser)(hashPassword)(userName, password)).to.throw()
        })
      })

      describe('when hashPassword fails', () => {
        it('should throw an error', () => {
          const basHashPassword = () => {throw new Error}
          expect(() => core.createUserUseCase(isUserNameUnique)(createUser)(basHashPassword)(userName, password)).to.throw()
        })
      })

    })

  })

  describe('updateUser use case', () => {

    const testUser = {
      id: "1",
      userName: "testUser",
      password: "password"
    }

    let findUserByIdCalled = false
    let passedUserId = ""
    
    const findUserById = userId => {
      findUserByIdCalled = true
      passedUserId = userId
      return testUser
    }

    let saveUserCalled = false
    let savedUser = {}

    const saveUser = user => {
      saveUserCalled = true
      savedUser = user
    }

    const userId = "1"
    const updatePropsObj = {userName: "testUser2"}
    const updatedUser = core.updateUserUseCase(findUserById)(saveUser)(userId, updatePropsObj)

    describe('happy path', () => {

      it('should return a func after passing findUserById', () => {
        core.updateUserUseCase(findUserById).should.be.a('function')
      })

      it('should return a func after passing saveUser', () => {
        core.updateUserUseCase(findUserById)(saveUser).should.be.a('function')
      })

      it('should call findUserById func dependency', () => {
        findUserByIdCalled.should.equal(true)
      })

      it('should pass userId arg to findUserById', () => {
        passedUserId.should.equal(userId)
      })

      it('should call saveUser func dependency', () => {
        saveUserCalled.should.equal(true)
      })

      it('should pass updatedUser to saveUser', () => {
        savedUser.should.deep.equal(updatedUser)
      })

      it('should make a copy of found user merging updatePropsObj arg', () => {
        const clonedUser = Object.assign({}, testUser, updatePropsObj)
        updatedUser.should.not.deep.equal(testUser)
        updatedUser.id.should.equal(testUser.id)
        updatedUser.should.deep.equal(clonedUser)
      })

    })

    describe('error path', () => {

      describe('when findUserById is wrong type', () => {
        it('should throw a type error', () => {
          expect(() => core.updateUserUseCase('findUserById')).to.throw(TypeError)
        })
      })

      describe('when saveUser is wrong type', () => {
        it('should throw a type error', () => {
          expect(() => core.updateUserUseCase(findUserById)('saveUser')).to.throw(TypeError)
        })
      })

      describe('when userId is wrong type', () => {
        it('should throw a type error', () => {
          expect(() => core.updateUserUseCase(findUserById)(saveUser)(1, updatePropsObj)).to.throw(TypeError)
        })
      })

      describe('when updatePropsObj is wrong type', () => {
        it('should throw a type error', () => {
          expect(() => core.updateUserUseCase(findUserById)(saveUser)(userId, "1")).to.throw(TypeError)
        })

        describe('when an array', () => {
          it('should throw a type error', () => {
            expect(() => core.updateUserUseCase(findUserById)(saveUser)(userId, [])).to.throw(TypeError)
          })
        })

      })

      describe('when updatePropsObj tries to update id', () => {
        it('should throw an error', () => {
          expect(() => core.updateUserUseCase(findUserById)(saveUser)(userId, {id: "2"})).to.throw()
        })
      })

      describe('when updatePropsObj tries to update props not on user', () => {
        it('should throw an error', () => {
          expect(() => core.updateUserUseCase(findUserById)(saveUser)(userId, {foo: "bar"})).to.throw()
        })
      })

      describe('when updatePropsObj tires to update props of wrong type', () => {
        it('should throw a type error', () => {
          expect(() => core.updateUserUseCase(findUserById)(saveUser)(userId, {userName: 2})).to.throw(TypeError)
        })
      })

      describe('when findUserById throws an error', () => {
        it('should throw an error', () => {
          const findUserByIdError = () => {throw new Error}
          expect(() => core.updateUserUseCase(findUserByIdError)(saveUser)(userId, updatePropsObj)).to.throw()
        })
      })

      describe('when saveUser throws an error', () => {
        it('should throw an error', () => {
          const saveUserError = () => {throw new Error}
          expect(() => core.updateUserUseCase(findUserById)(saveUserError)(userId, updatePropsObj)).to.throw()
        })
      })

    })

  })

})