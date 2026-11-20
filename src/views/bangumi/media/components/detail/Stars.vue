<template>
    <ul class="item-star-wrapper clearfix">
        <li :class="['icon-star', {'icon-star-light': 'full' === star.type, 'icon-star-half': 'half' === star.type}]" v-for="(star, index) in stars" :key="index">
            <i v-if="'half' === star.type" class="path2"></i>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Stars',
    props: {
        score: {
            type: Number,
            default: 0
        }
    },
    computed: {
        stars() {
           let stars = [{type: "empty"},{type: "empty"},{type: "empty"},{type: "empty"},{type: "empty"}]
           if (0 === this.score) {
               return stars
           }
           for (let i = 0; i < 10; i++) {
               if (i < 2) {
                   stars[Math.floor(i / 2)].type = 'full'
               } else {
                   i < this.score && (stars[Math.floor(i / 2)].type = i % 2 == 0 ? "half" : "full")
               }
           }
           return stars
        }
    }
}
</script>