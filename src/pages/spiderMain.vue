<template>
	<VuetifyLayout>
		<div>
			<div class="flex-column">
				<div class="title-box">
					<img class="dpg-logo" src="https://github.com/msa-ez/cloud-iq/assets/149130268/1d4667a1-b6b7-47ef-a07c-94dc0da510b2" />
					<div class="main-title">클라우드 네이티브 전환 가이드라인( Beta )</div>
					<img class="iq-logo" src="https://github.com/msa-ez/cloud-iq/assets/149130268/66649787-f394-49f9-8a72-8002997161c6" />
				</div>
				<v-row>
					<v-col v-for="(step, index) in steps" :key="index">
						<v-card @click="goToStep(step.path)" class="card-box">
							<h2>Step. {{ index + 1 }}</h2>
							<h1>{{ step.name }}</h1>
							<div>{{ step.name_en }}</div>
						</v-card>
					</v-col>
				</v-row>
				<div class="flex-grow-1"></div> 
				<v-row class="align-left justify-left footer-wrap">
					<v-btn text @click="goToallGuide()">전환가이드 전체 보기</v-btn>
					<v-divider vertical class="mx-2"></v-divider> 
					<v-btn text>About</v-btn>
				</v-row>
			</div>
		</div>
	</VuetifyLayout>
</template>

<script>
export default {
	components: {
	},
	computed: {
	},
	data() {
		return {
			steps: 
			[
				{
					name: "목표수준 설정",
					name_en: "Goal Setting",
					path: "/goal-setting"
				},
				{
					name: "현 수준 평가",
					name_en: "Assessment",
					path: "/assessment"
				},
				{
					name: "전환 가이드",
					name_en: "Get the Guide",
					path: "/get-the-guide"
				}
			]
		}
	},
	mounted() {
	},
	methods: {
		goToStep(path) {
			this.$router.push(path);
		},
        goToallGuide() {
            this.$router.push('/all-guide');
        }
	},
};
</script>

<style>
.title-box {
	width: 100%;
	margin: 0 auto;
	text-align: center;
}
/* .main-logo {
	height: calc(50vh - 36px);
} */
.dpg-logo {
	max-width: 100%;
	height: auto;
	margin-top: 20px;
}
.main-title {
	font-size: 45px;
	font-weight: bold;
	color: #003669;
}
.iq-logo {
	max-width: 100%;
	height: auto;
}
.card-box {
	margin: 40px 20px 20px 20px; 
	padding: 30px; 
	text-align: center;
}
.card-box > h1 {
	margin-top: 40px;
}
.card-box > div {
	font-size: 20px; 
	margin-top: 20px;
}
.footer-wrap {
	height:36px;
	position: fixed;
	bottom:1%;
}
@media only screen and (max-width:1400px) {
	/* .main-logo {
		height: calc(50vh - 66px);
	} */
	.main-title {
		font-size: 38px;
	}
	.card-box > h1 {
		margin-top: 30px;;
	}
	.footer-wrap {
		position: relative;
	}
}
@media only screen and (max-width:700px) {
	/* .main-logo {
    	width: 100%;
		height: 100%;
  	} */
	.dpg-logo {
		width: 250px;
	}
	.main-title {
		font-size: 27px;
	}
	.iq-logo {
		width: 350px;
	}
	.card-box {
		margin: 10px auto;
		width: 90vw;
	}
	.card-box > h2 {
		font-size: 22px;
	}
	.card-box > h1 {
		font-size: 26px;
	}
	.card-box > div {
		font-size: 16px;
	}
} 
</style>

