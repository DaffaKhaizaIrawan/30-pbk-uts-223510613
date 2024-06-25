<template>
  <div v-if="activeTab === 'posts'" class="tab-content">
    <h2 class="tab-title">Postingan</h2>
    <div class="user-select">
      <label for="userSelect">Pilih User:</label>
      <select v-model="selectedUser" id="userSelect" @change="getPosts">
        <option value="" disabled>Pilih User</option>
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
    </div>
    <ul class="post-list">
      <li class="post-item" v-for="(post, index) in posts" :key="post.id">
        <div class="post-content">
          <h3>{{ index + 1 }}. <strong>{{ post.title }}</strong></h3>
          <p>{{ post.body }}</p>
        </div>
      </li>
      <li v-if="posts.length === 0" class="post-item">
        <p>Tidak ada postingan untuk user ini.</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activeTab: 'posts',
      users: [],
      posts: [],
      selectedUser: null
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Gagal mengambil data user:', error);
      }
    },
    async getPosts() {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.posts = response.data;
      } catch (error) {
        console.error('Gagal mengambil data postingan:', error);
      }
    },
    showPosts() {
      this.activeTab = 'posts';
      this.getPosts();
    },
  }
};
</script>

<style scoped>
.tab-content {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  
}

.tab-title {
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
}

.user-select {
  margin-bottom: 10px;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  margin-bottom: 20px;
}

.post-item h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.post-item p {
  font-size: 16px;
  line-height: 1.6;
}

.user-select label {
  display: block;
  margin-bottom: 5px;
}

.post-content {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.post-content h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.post-content p {
  font-size: 16px;
  line-height: 1.6;
}
</style>
