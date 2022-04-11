<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ session }) {
    if (!session?.user?.id) {
      return {
        status: 301,
        redirect: "/?redirect=/quiz",
      };
    }

    return {
      props: {
        session: session,
      },
    };
  }
</script>

<script lang="ts">
  import { supabase } from "$lib/utils/supabaseClient";

  const createQuiz = async () => {
    await fetch("/api/quiz.json", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
    });
  };

  const getQuiz = async () => {
    const { data, error } = await supabase.from("musikquiz").select();
    if (error) console.error(error);

    console.log(data);
    /* const request = await fetch("/api/quiz.json", {
      method: "GET",
      credentials: "same-origin",
    });

    const data = await request.json();
    console.log(data); */
  };

  getQuiz();
</script>

<h1>Welcome to Musikquiz Maschine 3000</h1>
