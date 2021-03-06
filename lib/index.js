const useCases = require('./useCases')
const entities = require('./entities')

const createTimerUseCase = useCases.timerUseCases.createTimer
const getTimerUseCase = useCases.timerUseCases.getTimer
const getTimersByUserIdUseCase = useCases.timerUseCases.getTimersByUserId
const startTimerUseCase = useCases.timerUseCases.startTimer
const stopTimerUseCase = useCases.timerUseCases.stopTimer
const decrementTimerUseCase = useCases.timerUseCases.decrementTimer
const resetTimerUseCase = useCases.timerUseCases.resetTimer
const updateTimerUseCase = useCases.timerUseCases.updateTimer
const deleteTimerUseCase = useCases.timerUseCases.deleteTimer
const createTimerAlertUseCase = useCases.timerAlertUseCases.createTimerAlert
const getTimerAlertUseCase = useCases.timerAlertUseCases.getTimerAlert
const getTimerAlertsByTimerIdUseCase = useCases.timerAlertUseCases.getTimerAlertsByTimerId
const updateTimerAlertUseCase = useCases.timerAlertUseCases.updateTimerAlert
const activateTimerAlertUseCase = useCases.timerAlertUseCases.activateTimerAlert
const deactivateTimerAlertUseCase = useCases.timerAlertUseCases.deactivateTimerAlert
const deleteTimerAlertUseCase = useCases.timerAlertUseCases.deleteTimerAlert
const createUserUseCase = useCases.userUseCases.createUser
const getUserUseCase = useCases.userUseCases.getUser
const updateUserUseCase = useCases.userUseCases.updateUser
const authenticateUserUseCase = useCases.userUseCases.authenticateUser
const deleteUserUseCase = useCases.userUseCases.deleteUser
const createInventoryUseCase = useCases.inventoryUseCases.createInventory
const getInventoryUseCase = useCases.inventoryUseCases.getInventory
const getInventoriesByUserIdUseCase = useCases.inventoryUseCases.getInventoriesByUserId
const updateInventoryUseCase = useCases.inventoryUseCases.updateInventory
const deleteInventoryUseCase = useCases.inventoryUseCases.deleteInventory
const createInventoryItemUseCase = useCases.inventoryItemUseCases.createInventoryItem
const getInventoryItemUseCase = useCases.inventoryItemUseCases.getInventoryItem
const getInventoryItemsByInventoryIdUseCase = useCases.inventoryItemUseCases.getInventoryItemsByInventoryId
const updateInventoryItemUseCase = useCases.inventoryItemUseCases.updateInventoryItem
const deleteInventoryItemUseCase = useCases.inventoryItemUseCases.deleteInventoryItem
const timerAlertEntity = entities.timerAlertEntity
const userEntity = entities.userEntity
const inventoryEntity = entities.inventoryEntity
const inventoryItemEntity = entities.inventoryItemEntity
const settingEntity = entities.settingEntity
const createSettingUseCase = useCases.settingUseCases.createSetting
const getSettingUseCase = useCases.settingUseCases.getSetting
const updateSettingUseCase = useCases.settingUseCases.updateSetting
const deleteSettingUseCase = useCases.settingUseCases.deleteSetting
const getSettingsByUserIdUseCase = useCases.settingUseCases.getSettingsByUserId

module.exports = {
  createTimerUseCase,
  getTimerUseCase,
  getTimersByUserIdUseCase,
  startTimerUseCase,
  stopTimerUseCase,
  decrementTimerUseCase,
  resetTimerUseCase,
  updateTimerUseCase,
  deleteTimerUseCase,
  createTimerAlertUseCase,
  getTimerAlertUseCase,
  getTimerAlertsByTimerIdUseCase,
  updateTimerAlertUseCase,
  activateTimerAlertUseCase,
  deactivateTimerAlertUseCase,
  deleteTimerAlertUseCase,
  createUserUseCase,
  getUserUseCase,
  updateUserUseCase,
  authenticateUserUseCase,
  deleteUserUseCase,
  createInventoryUseCase,
  getInventoryUseCase,
  getInventoriesByUserIdUseCase,
  updateInventoryUseCase,
  deleteInventoryUseCase,
  createInventoryItemUseCase,
  getInventoryItemUseCase,
  getInventoryItemsByInventoryIdUseCase,
  updateInventoryItemUseCase,
  deleteInventoryItemUseCase,
  timerAlertEntity,
  userEntity,
  inventoryEntity,
  inventoryItemEntity,
  settingEntity,
  createSettingUseCase,
  getSettingUseCase,
  getSettingsByUserIdUseCase,
  updateSettingUseCase,
  deleteSettingUseCase
}