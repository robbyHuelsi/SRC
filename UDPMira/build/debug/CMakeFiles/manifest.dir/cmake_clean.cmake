FILE(REMOVE_RECURSE
  "CMakeFiles/manifest"
)

# Per-language clean rules from dependency scanning.
FOREACH(lang)
  INCLUDE(CMakeFiles/manifest.dir/cmake_clean_${lang}.cmake OPTIONAL)
ENDFOREACH(lang)
