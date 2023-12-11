<template>
	<div>
		<v-row>
			<v-col>
				<div class="qna-box assess-box" >
					<div class="tab-info">본 단계에서는 클라우드 네이티브 앱이 가져야 할 주요 관점별 현 수준을 평가하여 목표 수준과의 Gap을 가시화 (개발조직이 내부에 있을 때 - 발주기관이, 개발 조직이 내부에 없을 때 - 수행기관이 평가 가능) 합니다. 아래 현 수준에 해당하는 역량별 체크포인트에 체크해 주시기 바랍니다.</div>
					<div v-for="(perspective, index) in selectedUser.perspectives" :key="index" style="margin-bottom: 40px;">
						<h2 style="margin-bottom: 5px;">{{ perspective.name }}</h2>
						<div v-for="(level, levelIndex) in perspective.levels" :key="levelIndex">
							<h3>Level {{ levelIndex + 1 }}</h3>
							<div style="margin-bottom: 20px;">
								<label v-for="(checkpoint, checkpointIndex) in level.checkpoints" :key="checkpointIndex">
									<div style="display:flex; align-items: start; margin-left: 15px;line-height: 1.7;">
										<input type="checkbox" v-model="checkpoint.checked" @change="updateLevelCompletion(perspective, level)"
										style="margin: 5px 5px 0 0;">
										<span style="color: black">{{ checkpoint.text }}</span>
									</div>
								</label>
							</div>
						</div>
					</div>
				
					<div>
						<h2>Result</h2>
						<p v-if="isAllLevelsCompleted">All levels are completed!</p>
						<p v-else>Some levels are not completed.</p>
					</div>
				</div>
			</v-col>
			<v-col>
				<SpiderChart
					:perspectives="selectedUser.perspectives"
					:chartWidth="chartWidth"
					:chartHeight="chartHeight"
					:chartCenterX="chartCenterX"
					:chartCenterY="chartCenterY"
					:chartRadius="chartRadius"
					:labelOffset="labelOffset"
					:maxDataValue="maxDataValue"
					:pointRadius="pointRadius"
				/>
			</v-col>
		</v-row>
	</div>
</template>
  
<script>
import SpiderChart from './SpiderChart.vue'
import AssessmentData from './AssessmentData.js'

export default {
	mixins: [
		AssessmentData
	],
    components: {
        SpiderChart,
    },
    props: {
        selectedUser: [],
    },
	data() {
        return {
        }
	},
	mounted() {
	},
	watch: {
    },
	methods: {
		updateLevelCompletion(perspective, level) {
			level.isCompleted = level.checkpoints.every(checkpoint => checkpoint.checked);
			this.$emit('saveUsers')
		},
	}
};
</script>
<style>
.tab-info {
	font-size:16px; font-weight: 700;
	margin-bottom:20px;
}
</style>
  