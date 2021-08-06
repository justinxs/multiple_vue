<template>
    <div id="app" class="web-container">
		<router-view></router-view>
	</div>
</template>
<script>
export default {
    name: 'Hybird',
    mounted () {
        //  IOS系统设备激活a标签:active状态
		/(iPhone|iPad|iPod|iOS)/ig.test(navigator.userAgent) && document.body.addEventListener('touchstart', () => {});
    }
}
</script>