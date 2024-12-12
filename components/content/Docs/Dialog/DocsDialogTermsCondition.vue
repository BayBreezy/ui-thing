<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Terms & Conditions" />
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle
            class="border-b border-border px-6 py-4 text-base"
            title="Terms & Conditions"
          />
          <div ref="contentRef" class="overflow-y-auto">
            <UiDialogDescription>
              <div class="px-6 py-4">
                <div class="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div class="space-y-4">
                    <div class="space-y-1">
                      <p>
                        <strong>Acceptance of Terms</strong>
                      </p>
                      <p>
                        By accessing and using this website, users agree to comply with and be bound
                        by these Terms of Service. Users who do not agree with these terms should
                        discontinue use of the website immediately.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>User Account Responsibilities</strong>
                      </p>
                      <p>
                        Users are responsible for maintaining the confidentiality of their account
                        credentials. Any activities occurring under a user&lsquo;s account are the
                        sole responsibility of the account holder. Users must notify the website
                        administrators immediately of any unauthorized account access.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Content Usage and Restrictions</strong>
                      </p>
                      <p>
                        The website and its original content are protected by intellectual property
                        laws. Users may not reproduce, distribute, modify, create derivative works,
                        or commercially exploit any content without explicit written permission from
                        the website owners.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Limitation of Liability</strong>
                      </p>
                      <p>
                        The website provides content &ldquo;as is&ldquo; without any warranties. The
                        website owners shall not be liable for direct, indirect, incidental,
                        consequential, or punitive damages arising from user interactions with the
                        platform.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>User Conduct Guidelines</strong>
                      </p>
                      <ul class="list-disc pl-6">
                        <li>Not upload harmful or malicious content</li>
                        <li>Respect the rights of other users</li>
                        <li>Avoid activities that could disrupt website functionality</li>
                        <li>Comply with applicable local and international laws</li>
                      </ul>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Modifications to Terms</strong>
                      </p>
                      <p>
                        The website reserves the right to modify these terms at any time. Continued
                        use of the website after changes constitutes acceptance of the new terms.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Termination Clause</strong>
                      </p>
                      <p>
                        The website may terminate or suspend user access without prior notice for
                        violations of these terms or for any other reason deemed appropriate by the
                        administration.
                      </p>
                    </div>

                    <div class="space-y-1">
                      <p>
                        <strong>Governing Law</strong>
                      </p>
                      <p>
                        These terms are governed by the laws of the jurisdiction where the website
                        is primarily operated, without regard to conflict of law principles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </UiDialogDescription>
          </div>
        </UiDialogHeader>
        <UiDialogFooter class="border-t border-border px-6 py-4 sm:items-center">
          <TransitionSlide appear>
            <span
              v-if="!arrivedState.bottom"
              class="grow text-xs text-muted-foreground max-sm:text-center"
            >
              Read all terms before accepting.
            </span>
          </TransitionSlide>
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline"> Cancel </UiButton>
          </UiDialogClose>
          <UiDialogClose as-child>
            <UiButton type="button" :disabled="!arrivedState.bottom"> I agree </UiButton>
          </UiDialogClose>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const contentRef = ref<HTMLDivElement | null>(null);
  const { arrivedState } = useScroll(contentRef);
</script>
