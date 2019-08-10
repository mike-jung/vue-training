<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">홈</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">추가</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/edit/1" class="nav-link">수정</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/list" class="nav-link">리스트</router-link>
        </li>
      </ul>
    </nav>
    <br>
    <transition name="fade">
      <router-view />
    </transition>
      
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>