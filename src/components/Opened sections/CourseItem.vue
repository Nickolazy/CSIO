<template>
	<li class="courses-drop-item">
        <div class="courses-drop-item-length-wrapper">
                        <div class="courses-drop-item-length">
                            <span>
                                Количество часов:
                            </span>
                            <strong>40</strong>
                            &nbsp;

                            <span>
                                Продолжительность:
                            </span>
                            <strong>2 недели</strong>
                            &nbsp;
                        </div>

                        <button class="button banner-button-sing-up courses-drop-item-more" type="button">
                            Подробнее
                        </button>
                    </div>

					<div class="courses-drop-item-name">
						<p>
							Учитель математики и информатики. педагогическая деятельность по проектированию и реализации
							образовательного процесса в соответствии с ФГОС с присвоением квалификации «учитель математики и
							информатики и ИКТ (информационно-коммуникационных технологий)
						</p>
					</div>

					<ul v-if="isProfessional" class="courses-drop-item-skills-list">
						<li class="courses-drop-item-skills-item">
							<p>
								Диплом предоставляет право на ведение профессиональной деятельности в сфере Педагогических услуг
							</p>
						</li>
						<li class="courses-drop-item-skills-item">
							<p>
								Квалификация Педагог (преподаватель основ безопасности жизнедеятельности)
							</p>
						</li>
					</ul>
				</li>
</template>

<script setup>

	const isProfessional = () => {
		
	}
</script>

<style scoped>

</style>
