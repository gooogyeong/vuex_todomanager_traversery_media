//this module makes request to backend
import axios from "axios";

const state = {
  todos: [
    // {
    //   id: 1,
    //   title: "go to bank",
    // },
    // {
    //   id: 2,
    //   title: "do laundry",
    // },
    // {
    //   id: 3,
    //   title: "get a job",
    // },
  ],
};

const getters = {
  allTodos: (state) => state.todos, //parts of the state that we need
};

const actions = {
  async fetchTodos({ commit }) {
    //인자로 받는 object를 destruct 해서 commit만 사용. 얘가 mutation을 하므로.
    //mutation을 바로 호출하는 것이 아니라 commit을 사용해야함
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    //console.log(response.data);
    commit("setTodos", response.data); //1st params: mutation we want to call, 2st: payload
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    //console.log(response.data);
    commit("addTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("deleteTodo", id);
  },
  // eslint-disable-next-line no-unused-vars
  async filterTodos({ commit }, e) {
    //console.log(filterTodo);
    //console.log(e);
    const limit = parseInt(e.target.value);
    //예제에서는 const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
    await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("filterTodos", limit);
    //예제: commit('filterTodos', response.data)
  },
  async toggleComplete({ commit }, updTodo) {
    //튜토리얼에서 두번째 params 빼먹은듯
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      updTodo
    );
    console.log(response.data);
    commit("toggleComplete", updTodo);
  },
};

const mutations = {
  //! () => () ???
  setTodos: (state, todos) => (state.todos = todos),
  addTodo: (state, newTodo) => state.todos.unshift(newTodo), //(state.todos = [...state.todos, newTodo]),
  deleteTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  filterTodos: (state, limit) => (state.todos = state.todos.slice(0, limit)),
  toggleComplete: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state, //state: state 이렇게 할수도 있지만 이름이 똑같으니까 이렇게 써줘도 된단다.
  getters,
  actions,
  mutations,
};
