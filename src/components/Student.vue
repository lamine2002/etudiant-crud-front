<script>
  
 import axios from 'redaxios';
//  import 'flowbite';

 const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

export default {
  name: 'Student',
  data () {
    return {
      result: {},
      student:{
        id: '',
        name: '',
        address: '',
        phone: ''
      }
    }
  },
  created() { 
    this.StudentLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },

  methods: {
    async StudentLoad() {
      try {
        const page = "http://127.0.0.1:8000/api/student";
        const response = await axios.get(page, config);
        console.log(response.data);
        this.result = response.data;
        
      } catch (error) {
        if (error.data.status === 401) {
          alert(error.data.detail);
        }
        console.error(error.data);
      }
    },
         
    async save() {
      if (this.student.id === '') {
        await this.saveData();
      } else {
        await this.updateData();
      }       
    },

    async saveData() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/student", this.student, config);
        alert("saveddddd");
        await this.StudentLoad();
        this.student.name = '';
        this.student.address = '';
        this.student.phone = '';
        this.student.id = '';
      } catch (error) {
        console.error(error);
      }
    },

    edit(student) {
      this.student = student;
    },

    async updateData() {
      try {
        const editrecords = `http://127.0.0.1:8000/api/student/${this.student.id}`;
        const response = await axios.put(editrecords, this.student, config);
        alert("Updated!!!");
        this.student.name = '';
        this.student.address = '';
        this.student.phone = '';
        this.student.id = '';
        await this.StudentLoad();
      } catch (error) {
        console.error(error);
      }
    },

    async remove(student) {
      try {
        const url = `http://127.0.0.1:8000/api/student/${student.id}`;
        await axios.delete(url, config);
        alert("Deleteddd");
        await this.StudentLoad();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Inscription des étudiants</h2>
    <form @submit.prevent="save" class="space-y-4">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Nom de l'étudiant</label>
        <input type="text" v-model="student.name" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Nom de l'étudiant">
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Adresse de l'étudiant</label>
        <input type="text" v-model="student.address" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Adresse de l'étudiant">
      </div>
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700">Téléphone</label>
        <input type="text" v-model="student.phone" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Téléphone">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enregistrer</button>
    </form>

    <h2 class="text-2xl font-bold mt-8 mb-4">Vue des étudiants</h2>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 font-medium text-gray-900">ID</th>
          <th class="py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 font-medium text-gray-900">Nom de l'étudiant</th>
          <th class="py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 font-medium text-gray-900">Adresse</th>
          <th class="py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 font-medium text-gray-900">Téléphone</th>
          <th class="py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 font-medium text-gray-900">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in result" :key="student.id" class="bg-white border-b border-gray-200">
          <td class="py-2 px-4 text-sm leading-5 text-gray-900">{{ student.id }}</td>
          <td class="py-2 px-4 text-sm leading-5 text-gray-900">{{ student.name }}</td>
          <td class="py-2 px-4 text-sm leading-5 text-gray-900">{{ student.address }}</td>
          <td class="py-2 px-4 text-sm leading-5 text-gray-900">{{ student.phone }}</td>
          <td class="py-2 px-4 text-sm leading-5 text-gray-900">
            <button type="button" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2" @click="edit(student)">Modifier</button>
            <button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" @click="remove(student)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>