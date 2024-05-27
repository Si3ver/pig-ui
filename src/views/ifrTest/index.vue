<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<iframe :src="url" width="100%" height="100%"></iframe>
		</div>
	</div>
</template>

<script setup lang="ts" name="ifrTest">
const url = 'http://localhost:8888';
</script>

<style scoped lang="scss"></style>
