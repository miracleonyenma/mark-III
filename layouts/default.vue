<template>
  <SiteHeader>
    <SiteNav />
    <template #outside-wrapper>
      <ThemeButton />
    </template>
  </SiteHeader>
  <slot />
  <div id="bottom-of-page"></div>
  <SiteFooter />
</template>
