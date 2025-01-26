<template>
    <span class="spinner-dots" role="status" aria-hidden="true"></span>
</template>

<style scoped>
.spinner-dots {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #fff; /* Warna titik */
    animation: dots 1.4s infinite ease-in-out both;
  }
  
  .spinner-dots::before,
  .spinner-dots::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #fff; /* Warna titik */
  }
  
  .spinner-dots::before {
    left: -1.5rem;
    animation: dots-before 1.4s infinite ease-in-out both;
  }
  
  .spinner-dots::after {
    left: 1.5rem;
    animation: dots-after 1.4s infinite ease-in-out both;
  }
  
  @keyframes dots {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
  
  @keyframes dots-before {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1);
    }
    60%, 100% {
      transform: scale(0);
    }
  }
  
  @keyframes dots-after {
    0%, 40% {
      transform: scale(0);
    }
    60% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
</style>