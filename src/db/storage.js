export const setActiveCycleId = id =>
  localStorage.setItem("activeCycleId", id)

export const getActiveCycleId = () =>
  localStorage.getItem("activeCycleId")
