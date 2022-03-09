<template>
  <div class="space-y-10 max-w-7xl mx-auto bg-white/50 backdrop-blur-md">
    <div class="flex md:flex-row flex-col p-4 items-center">
      <div class="md:w-1/2 wow slideInLeft order-1 md:order-1">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets9.lottiefiles.com/packages/lf20_qj83frkp.json"
        >
        </lottie-player>
        <div class="text-center text-3xl">
          Hãy đến trung tâm ý tế để tiêm chủng một cách an toàn
        </div>
      </div>
      <div class="md:w-1/2 text-2xl text-red-600 text-center wow slideInRight order-2 md:order-2" data-wow-duration="2s">
        <p>Tiêm chủng an toàn, bản thân an toàn</p>
      </div>
    </div>
    <div class="flex md:flex-row flex-col p-4 items-center">
      <div class="md:w-1/2 text-2xl text-blue-600 text-center wow slideInLeft order-2 md:order-1">
        <p>Giữ khoảng cách khi tiếp xúc với người khác.</p>
      </div>
      <div class="md:w-1/2 wow slideInRight order-1 md:order-2">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets5.lottiefiles.com/private_files/lf30_V7dVXe.json"
        >
        </lottie-player>
        <div class="text-center text-3xl">
          Luôn giữ khoảng cách khi giao tiếp
        </div>
      </div>
    </div>
    <div class="flex md:flex-row flex-col p-4 items-center">
      <div class="md:w-1/2 wow slideInRight order-1 md:order-1">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets5.lottiefiles.com/packages/lf20_uidhg9jw.json"
        >
        </lottie-player>
        <div class="text-center text-3xl">
          Luôn mang khẩu trang khi giao tiếp với người khác
        </div>
      </div>
      <div class="md:w-1/2 text-2xl text-green-600 wow slideInLeft order-2 md:order-2">
        <p>Đeo khẩu trang vải thường xuyên tại nơi công cộng, nơi tập trung đông người.</p>
        <p>Đeo khẩu trang y tế tại các cơ sở y tế, khu cách ly.</p>
      </div>
    </div>
    <div class="flex md:flex-row flex-col p-4 items-center">
      <div class="md:w-1/2 text-center text-3xl text-yellow-600 wow slideInLeft order-2 md:order-1">
        <p>Quét QR để hiển thị thông tin của bạn</p>
        <p>Chia sẽ QR để người khác biết tình trạng tiêm vacin của bạn</p>
      </div>
      <div class="md:w-1/2 wow slideInRight order-1 md:order-2">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets5.lottiefiles.com/packages/lf20_ebj4mazi.json"
        >
        </lottie-player>
        <div class="text-center text-3xl">
          Quét QR để hiển thị thông tin của bạn
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    window.onload = () =>{
      setTimeout(() =>{
        new WOW().init();
      },3000)
    }
  }
};
</script>
