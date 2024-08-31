<template>
	<div class="sidebar-drop-wrapper">
		<section class="sidebar-drop courses-drop">
			<form class="courses-drop-radio-select">
				<label>
					<input type="radio" name="option" value="Профессиональная подготовка" class="courses-drop-radio-select-input" checked>
					<span>Профессиональная<br> подготовка</span>
				</label>

				<label>
					<input type="radio" name="option" value="Общеобразовательные курсы" class="courses-drop-radio-select-input">
					<span>Общеобразовательные<br> курсы</span>
				</label>

				<label>
					<input type="radio" name="option" value="Повышение квалификации" class="courses-drop-radio-select-input">
					<span>Повышение<br> квалификации</span>
				</label>
			</form>

			<form class="courses-drop-search">
				<input type="text" class="courses-drop-search-input" placeholder="Поиск по курсам">
				<button class="button courses-drop-search-button" type="submit">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
							stroke="#FF4800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M20.9998 21L15.7998 15.8" stroke="#FF4800" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</button>
			</form>

			<ul class="courses-drop-list">
				<CourseItem />
				<CourseItem />
			</ul>

			<button @click="closeAllCourses" type="button" class="button close-button sidebar-drop-close-button">
				<svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 26L26 1" stroke="black" />
					<path d="M26 26L0.999999 1" stroke="black" />
				</svg>
			</button>
		</section>
	</div>
</template>

<script setup>
	import CourseItem from './CourseItem.vue';
	const emit = defineEmits(['close'])

  const closeAllCourses = () => {
    emit('close')
  }
</script>

<style scoped>
	
</style>
