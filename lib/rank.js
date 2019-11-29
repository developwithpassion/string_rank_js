import { equal_to } from '@developwithpassion/matchers_js';

const empty = equal_to('');
const no_match = equal_to(-1);
const previous_character_was_a_space = equal_to(' ');

const INDEX_MATCH_VALUE = 0.7;
const REGULAR_MATCH_VALUE = 0.1;
const SIGNIFICANT_WORD_START_VALUE = 0.8;
const FINAL_ADJUSTMENT_VALUE = 0.15;

export default (full_phrase, partial_phrase) => {
  if (full_phrase === partial_phrase) return 1;

  if (empty(partial_phrase)) return 0;

  let running_score = 0;
  let character_score;
  let final_score = 0;

  const full_phrase_lowercase = full_phrase.toLowerCase();
  const full_phrase_length = full_phrase.length;

  const partial_phrase_lowercase = partial_phrase.toLowerCase();
  const partial_phrase_length = partial_phrase.length;
  let match_index;
  let starting_index = 0;

  for (let index = 0; index < partial_phrase_length; index++) {
    match_index = full_phrase_lowercase.indexOf(partial_phrase_lowercase[index], starting_index);

    if (no_match(match_index)) return 0;

    if (starting_index === match_index) {
      character_score = INDEX_MATCH_VALUE;
    } else {
      character_score = REGULAR_MATCH_VALUE;

      if (previous_character_was_a_space(full_phrase[match_index - 1]))
        character_score += SIGNIFICANT_WORD_START_VALUE;
    }

    if (full_phrase[match_index] === partial_phrase[index]) character_score += REGULAR_MATCH_VALUE;

    running_score += character_score;
    starting_index = match_index + 1;
  }

  final_score = 0.5 * (running_score / full_phrase_length + running_score / partial_phrase_length);

  if (partial_phrase_lowercase[0] === full_phrase_lowercase[0] && final_score < 0.85) {
    final_score += FINAL_ADJUSTMENT_VALUE;
  }

  return final_score;
};
