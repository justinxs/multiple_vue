<template>
	<section class="web-content">
		<header class="app-header">
            <span class="logo"></span>
            APP 头部finance
        </header>
        <div class="change-theme">
            <div class="theme-item" :class="{'current': theme.id == serviceId}" v-for="theme in themes" :key="theme.id" @click="changeTheme(theme)">{{theme.name}}</div>
        </div>
	</section>
</template>
<script>
export default {
    data() {
        return {
            themes: [
                {id: 3000, name: 'mallwin'},
                {id: 4000, name: 'maxlive'}
            ]
        }
    },
    computed: {
        serviceId() {
            return this.$store.state.serviceId
        }
    },
	created() {
        
	},
    methods: {
        changeTheme(theme) {
            this.$store.dispatch('changeServiceId', theme.id).then(({theme, interval}) => {
                console.log('theme loaded', theme, interval)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
	.change-theme {
        display: flex;
        flex-wrap: wrap;
    }
    .theme-item {
        font-size: pxChangeRem1080(50);
        border: 1px solid #ccc;
        margin: 10px;
        padding: 4px 10px;
        color: #fff;
        &.current {
            background-color: red;
        }
    }
    .logo {
        display: inline-block;
        width: 36px;
        height: 36px;
    }
</style>