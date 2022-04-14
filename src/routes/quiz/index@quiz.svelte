<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch }) {
    const request = await fetch("/api/quiz.json", {
      method: "GET",
      credentials: "same-origin",
    });

    const data = await request.json();
    console.log(data);

    return {
      props: {
        quiz: data
      },
    };
  }

  const createQuiz = async () => {
    await fetch("/api/quiz.json", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
    });
  };
</script>

<script lang="ts">
  import { session } from "$app/stores";
  import { supabase } from "$lib/utils/supabaseClient";

  const getQuizViaClient = async () => {
    const { data, error } = await supabase.from("musikquiz").select();
    if (error) console.error(error);
    console.log(data);
  };

  //console.log("SESSION");
  //console.log(session); // { user: { … } }
</script>

<h1>Welcome to Musikquiz Maschine 3000</h1>
