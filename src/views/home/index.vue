<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<splitpanes>
				<!-- 左边 70% -->
				<pane size="70">
					<splitpanes horizontal>
						<!-- 左上 25%：当前用户 -->
						<pane size="25">
							<current-user />
						</pane>
						<!-- 左下 75%：快捷导航栏 -->
						<pane size="75">
							<favorite />
						</pane>
					</splitpanes>
				</pane>
				<!-- 右边 30% -->
				<pane size="30">
					<splitpanes horizontal>
						<!-- 右上 58%：日历 -->
						<pane size="58">
							<schedule />
						</pane>
						<!-- 右下 42%：系统日志 -->
						<pane size="42">
							<sys-log />
						</pane>
					</splitpanes>
				</pane>
			</splitpanes>
		</div>
	</div>
</template>

<script setup lang="ts" name="home">
const CurrentUser = defineAsyncComponent(() => import('./current-user.vue'));
const Favorite = defineAsyncComponent(() => import('./favorite.vue'));
const Schedule = defineAsyncComponent(() => import('./schedule.vue'));
const SysLog = defineAsyncComponent(() => import('./sys-log.vue'));
</script>
