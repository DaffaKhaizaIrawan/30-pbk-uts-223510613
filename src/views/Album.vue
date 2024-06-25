<template>
    <div class="album-container">
      <h2>Album</h2>
      <div class="search-container">
        <input v-model="inputAlbumId" type="number" placeholder="Masukkan ID album">
      </div>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div v-if="photos.length > 0">
          <ul class="photo-list">
            <li v-for="photo in photos" :key="photo.id" class="photo-item">
              <img :src="photo.thumbnailUrl" alt="Thumbnail">
              <p><strong>Album ID:</strong> {{ photo.albumId }}</p>
              <p><strong>Photo ID:</strong> {{ photo.id }}</p>
              <p><strong>Title:</strong> {{ photo.title }}</p>
              <p><strong>URL:</strong> <a :href="photo.url" target="_blank">{{ photo.url }}</a></p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Album tidak ditemukan.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        album: {},
        photos: [],
        loading: false,
        inputAlbumId: null,
        internalAlbumId: null
      };
    },
    async mounted() {
      if (this.internalAlbumId !== null) {
        await this.getAlbums();
      }
    },
    methods: {
      async fetchPhotos() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/photos');
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          this.photos = await response.json();
        } catch (error) {
          console.error('Error fetching photos:', error.message);
        }
      },
      async fetchAlbum() {
        if (this.internalAlbumId !== null) {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${this.internalAlbumId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch album');
            }
            this.album = await response.json();
          } catch (error) {
            console.error('Error fetching album data:', error);
          }
        } else {
          console.error('Invalid albumId:', this.internalAlbumId);
        }
      },
      async getAlbums() {
        this.album = {};
        this.photos = [];
        this.loading = true; 
    
        await this.fetchPhotos();
        await this.fetchAlbum();
        this.selectByAlbumId();
    
        this.loading = false; 
      },
      selectByAlbumId() {
        if (this.photos.length > 0) {
          this.photos = this.photos.filter(photo => photo.albumId === parseInt(this.internalAlbumId));
        }
      },
      searchAlbum() {
        this.internalAlbumId = this.inputAlbumId;
        this.getAlbums();
      }
    },
    watch: {
      inputAlbumId: {
        immediate: true,
        handler(newVal) {
          if (newVal !== null) {
            this.internalAlbumId = newVal;
            this.getAlbums();
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .album-container {
    text-align: center;
    margin: 20px auto;
    max-width: 1000px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
  }
  
  .search-container {
    margin-bottom: 20px;
  }
  
  input {
    padding: 8px;
    margin-right: 10px;
    width: calc(100% - 120px); 
    max-width: 200px;
    box-sizing: border-box;
  }
  
  button {
    padding: 8px 12px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .photo-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .photo-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 400px;
    text-align: center;
    background-color: #fff; 
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }
  
  .photo-item p {
    margin: 5px 0;
  }
  
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    cursor: pointer;
    margin-bottom: 10px;
  }
  </style>
  