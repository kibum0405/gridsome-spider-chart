<template>
    <VuetifyLayout>
        <div>
            <v-row v-for="(guideItem, guideIndex) in guide" :key="guideIndex">
                <v-col 
                    v-for="(level, levelIndex) in guideItem.levels" 
                    :key="levelIndex"
                    cols="12" sm="6" md="3"
                >
                    <v-card :to="level.path">
                        <div>
                            <h3>{{ guideItem.name }}</h3>
                            <div>Level {{ level.level }}</div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </VuetifyLayout>
</template>

<script>
export default {
    components: {
    },
    data () {
        return {
            guide: [
                {
                    name: '기능분해관점',
                    name_en: 'decomposition',
                    levels: [
                        { level: 1, path: '/decomposition/level1' },
                        { level: 2, path: '/decomposition/level2' },
                        { level: 3, path: '/decomposition/level3' },
                        { level: 4, path: '/decomposition/level4' }
                    ]
                },
                {
					name: '데이터 관점',
					name_en: 'data',
                    levels: [
                        { level: 1, path: '/data/level1' },
                        { level: 2, path: '/data/level2' },
                        { level: 3, path: '/data/level3' },
                        { level: 4, path: '/data/level4' }
                    ]
                },
                {
					name: '소프트웨어 아키텍처 관점',
					name_en: 'sw-architecture',
                    levels: [
                        { level: 1, path: '/sw-architecture/level1' },
                        { level: 2, path: '/sw-architecture/level2' },
                        { level: 3, path: '/sw-architecture/level3' },
                        { level: 4, path: '/sw-architecture/level4' }
                    ]
                },
                {
					name: '인프라 아키텍처 관점',
					name_en: 'infra-architecture',
                    levels: [
                        { level: 1, path: '/infra-architecture/level1' },
                        { level: 2, path: '/infra-architecture/level2' },
                        { level: 3, path: '/infra-architecture/level3' },
                        { level: 4, path: '/infra-architecture/level4' }
                    ]
                },
                {
					name: '배포 관점',
					name_en: 'distribute',
                    levels: [
                        { level: 1, path: '/distribute/level1' },
                        { level: 2, path: '/distribute/level2' },
                        { level: 3, path: '/distribute/level3' },
                        { level: 4, path: '/distribute/level4' }
                    ]
                },
                {
					name: '팀 구조와 문화 관점',
					name_en: 'team-structure',
                    levels: [
                        { level: 1, path: '/team-structure/level1' },
                        { level: 2, path: '/team-structure/level2' },
                        { level: 3, path: '/team-structure/level3' },
                        { level: 4, path: '/team-structure/level4' }
                    ]
                },
            ]
        }
    },
    methods: {
    },
}
</script>

<style>
</style>
