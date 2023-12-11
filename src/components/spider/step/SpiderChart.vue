<template>
	<div class="spider-box">
		<div style="position:relative">
			<div style="position: absolute; top:5px; left:10px;">
				<v-row>
					<div style="width:16px; height:16px; border-radius: 5px; background-color:rgba(192, 75, 192, 0.5); margin:2px 5px 0px 0px;"></div>
					<div>목표수준</div>
				</v-row>
				<v-row>
					<div style="width:16px; height:16px; border-radius: 5px; background-color:rgba(75, 192, 192, 1); margin:2px 5px 0px 0px;"></div>
					<div>현수준</div>
				</v-row>
			</div>
		</div>
		<svg :width="chartWidth" :height="chartHeight">
			<g :transform="`translate(${chartCenterX}, ${chartCenterY})`">
				<g v-for="(perspective, index) in perspectives" :key="`perspective-${index}₩`">
					<line
						:x1="0"
						:y1="0"
						:x2="getCoordinate(chartRadius, index, perspectives.length)[0]"
						:y2="getCoordinate(chartRadius, index, perspectives.length)[1]"
						stroke="lightgray"
					/>
					<g v-for="level in maxDataValue" :key="`level-line-${index}-${level}`">
						<line
							:x1="getLevelLineCoordinate(index, level)[0]"
							:y1="getLevelLineCoordinate(index, level)[1]"
							:x2="getLevelLineCoordinate(index, level)[2]"
							:y2="getLevelLineCoordinate(index, level)[3]"
							stroke="lightgray"
							stroke-width="2"
						/>
					</g>
					<text
						:x="getCoordinate(chartRadius + labelOffset, index, perspectives.length)[0]"
						:y="getCoordinate(chartRadius + labelOffset, index, perspectives.length)[1]"
						dominant-baseline="middle"
						text-anchor="middle"
					>
						{{ perspective.name }}
					</text>
				</g>
				<g>
					<polygon
						:points="getPolygonPoints(perspectives)"
						fill="rgba(75, 192, 192, 0.2)"
						stroke="rgba(75, 192, 192, 1)"
					/>
					<polygon
						:points="getPolygonPointsGoal(perspectives)"
						fill="rgba(192, 75, 192, 0.1)"
            			stroke="rgba(192, 75, 192, 1)"
					/>
					<g v-for="(perspective, index) in perspectives">
						<circle
							:cx="getCoordinateForCircle(perspective, index)[0]"
							:cy="getCoordinateForCircle(perspective, index)[1]"
							:r="pointRadius"
							fill="rgba(75, 192, 192, 1)"
						/>
						<circle
							:cx="getCoordinateForCircleGoal(perspective, index)[0]"
							:cy="getCoordinateForCircleGoal(perspective, index)[1]"
							:r="pointRadius"
							fill="rgba(192, 75, 192, 0.5)"
						/>
					</g>
				</g>
			</g>
		</svg>
	</div>
</template>
  
<script>

export default {
    name: "GoalSetting",
	mixins: [
	],
	props: {
		perspectives: Array,
		chartWidth: Number,
		chartHeight: Number,
		chartCenterX: Number,
		chartCenterY: Number,
		chartRadius: Number,
		labelOffset: Number,
		maxDataValue: Number,
		pointRadius: Number
	},
    comments: {
    },
    data () {
        return {
        }
    },
	mounted() {
		
	},
	watch: {
    },
    methods: {
		getDataLength(perspectives) {
			let count = 0;
			Object.keys(perspectives).forEach(key => {
				var perspective = perspectives[key]
				perspective.details.forEach(detail => {
					count += 1;
				});
			});
			return count;
		},
		getCoordinateForCircle(perspective, index) {
			const completedLevels = perspective.levels.filter(level => level.isCompleted).length;
			const radius = this.chartRadius * (completedLevels / this.maxDataValue);
			return this.getCoordinate(radius, index, this.perspectives.length);
		},
		getCoordinateForCircleGoal(perspective, index) {
			const radius = this.chartRadius * (perspective.goalLevel / this.maxDataValue);
			return this.getCoordinate(radius, index, this.perspectives.length);
		},
		getCoordinate(radius, index, total) {
			const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
			const x = radius * Math.cos(angle);
			const y = radius * Math.sin(angle);
			return [x, y];
		},
		getLevelLineCoordinate(index, level) {
			// 각도 계산
			const angle = (Math.PI * 2 * index) / this.perspectives.length - Math.PI / 2;
			// 해당 레벨에서의 반지름 계산
			const radius = this.chartRadius * (level / this.maxDataValue - 1);
			// 축의 좌표를 계산
			const x = radius * Math.cos(angle);
			const y = radius * Math.sin(angle);

			// 수평 선의 길이를 정의
			const lineLength = 5; // 가로 선의 길이

			// 축에 수직인 선의 끝점을 계산하기 위한 각도 조정
			const anglePerpendicular = angle + Math.PI / 2;

			// 수평 선의 시작점과 끝점 계산
			const x1 = x + lineLength * Math.cos(anglePerpendicular);
			const y1 = y + lineLength * Math.sin(anglePerpendicular);
			const x2 = x - lineLength * Math.cos(anglePerpendicular);
			const y2 = y - lineLength * Math.sin(anglePerpendicular);

			return [x1, y1, x2, y2];
		},
		getPolygonPoints(perspectives) {
			if (!perspectives || perspectives.length === 0) {
				return '';
			}
			var perspectiveArray = perspectives
				.map((perspective, index) => {
					const completedLevels = perspective.levels.filter(level => level.isCompleted).length;
					const radius = this.chartRadius * (completedLevels / this.maxDataValue);
					return this.getCoordinate(radius, index, perspectives.length).join(',');
				})
				.join(' ');

			return perspectiveArray;
		},
		getPolygonPointsGoal(perspectives) {
			if (!perspectives || perspectives.length === 0) {
				return '';
			}
			var perspectiveArray = perspectives
			.map((perspective, index) => {
				const radius = this.chartRadius * (perspective.goalLevel / this.maxDataValue);
				return this.getCoordinate(radius, index, perspectives.length).join(',');
			})
			.join(' ');

			return perspectiveArray
		},
		checkAllLevelsCompletion(perspective) {
			perspective.isCompleted = perspective.levels.every((level) => level.isCompleted);
		
			const perspectiveIndex = this.chartData.labels.findIndex((label) => label === perspective.name);
			if (perspectiveIndex !== -1) {
				const lastCompletedLevelIndex = perspective.levels.findIndex((level) => !level.isCompleted) - 1;
				const value = lastCompletedLevelIndex !== -1 ? lastCompletedLevelIndex + 1 : this.chartData.labels.length;
				this.chartData.data[perspectiveIndex] = value;
				this.chartData.data2[perspectiveIndex] = value;
			}
		},
	}
}
</script>
  
<style>
.spider-box {
	/* background-color: lightblue; */
	/* width:130%; */
	/* margin-left: auto; */
}

/* 
@media only screen and (max-width:1100px) {
  .spider-box {
    width:100%;
  }    
}
@media only screen and (max-width:900px) {
  .spider-box {
    width:100%;
  }    
}*/
@media only screen and (max-width:700px) {
  .spider-box {
    /* width:100%; */
	/* overflow: auto; */
  }    
} 
</style>
  
  