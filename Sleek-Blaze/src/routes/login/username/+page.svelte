<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let username = "";
  let isLoading = false;
  let isAvailable = false;

  let debounceTimer: NodeJS.Timeout;

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid =
    username?.length > 2 && username.length < 16 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !isLoading;

  async function checkAvaibility() {
    isAvailable = false;
    clearTimeout(debounceTimer);

    isLoading = true;

    debounceTimer = setTimeout(async () => {
      console.log("Checking username", username);

      const ref = doc(db, "usernames", username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      isLoading = false;
    }, 500);
  }

  async function confirmUsername() {
    console.log("confirm username", username);

    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user!.photoURL ?? null,
      bio: "My bio",
      links: [
        {
          title: "Test link",
          url: "https://google.com",
          icon: "custom",
        },
      ],
    });

    await batch.commit();
  }
</script>

<AuthCheck>
  {#if $userData?.username}
    <p>
      Your username is
      <span class="font-bold text-green-400">
        @{$userData.username}
      </span>
    </p>
    <p>(Usernames cannot be changed)</p>
    <a class="btn btn-primary" href="/login/photo">Upload Profile Image</a>
  {:else}
    <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
      <input
        type="text"
        placeholder="Username"
        class="input w-full"
        bind:value={username}
        on:input={checkAvaibility}
        class:input-error={!isValid && isTouched}
        class:input-warning={isTaken}
        class:input-success={isAvailable && isValid && !isLoading}
      />

      <div class="my-4 min-h-16 px-8 w-full">
        {#if isLoading}
          <p class="text-secondary">Checking availability of @{username}...</p>
        {/if}

        {#if !isValid && isTouched}
          <p class="text-error text-sm">
            must be 3-16 characters long, alphanumeric only
          </p>
        {/if}

        {#if isValid && !isAvailable && !isLoading}
          <p class="text-warning text-sm">
            @{username} is not available
          </p>
        {/if}

        {#if isAvailable}
          <button class="btn btn-success">Confirm username @{username} </button>
        {/if}
      </div>
    </form>
  {/if}
</AuthCheck>
