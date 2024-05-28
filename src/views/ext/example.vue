<template>
	<v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

provide(THEME_KEY, 'light');

const option = ref({
	series: {
		type: 'sankey',
		layout: 'none',
		emphasis: {
			focus: 'adjacency',
		},
		data: [
			{
				name: 'a',
			},
			{
				name: 'b',
			},
			{
				name: 'a1',
			},
			{
				name: 'a2',
			},
			{
				name: 'b1',
			},
			{
				name: 'c',
			},
		],
		links: [
			{
				source: 'a',
				target: 'a1',
				value: 5,
			},
			{
				source: 'a',
				target: 'a2',
				value: 3,
			},
			{
				source: 'b',
				target: 'b1',
				value: 8,
			},
			{
				source: 'a',
				target: 'b1',
				value: 3,
			},
			{
				source: 'b1',
				target: 'a1',
				value: 1,
			},
			{
				source: 'b1',
				target: 'c',
				value: 2,
			},
		],
	},
});
</script>

<style scoped>
.chart {
	height: 100vh;
}
</style>
