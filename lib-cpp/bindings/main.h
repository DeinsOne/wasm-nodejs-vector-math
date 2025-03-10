// Generated by `wit-bindgen` 0.39.0. DO NOT EDIT!
#ifndef __BINDINGS_MAIN_H
#define __BINDINGS_MAIN_H
#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

typedef struct twin_test_math_vec3_t {
  float   x;
  float   y;
  float   z;
} twin_test_math_vec3_t;

typedef struct twin_test_math_mat4_t {
  float   *ptr;
  size_t len;
} twin_test_math_mat4_t;

typedef twin_test_math_vec3_t exports_twin_test_stateful_vec3_t;

typedef twin_test_math_mat4_t exports_twin_test_stateful_mat4_t;

typedef struct exports_twin_test_stateful_component_t {
  int32_t   id;
  exports_twin_test_stateful_vec3_t   position;
} exports_twin_test_stateful_component_t;

typedef struct exports_twin_test_stateful_own_clip_projector_t {
  int32_t __handle;
} exports_twin_test_stateful_own_clip_projector_t;

typedef struct exports_twin_test_stateful_clip_projector_t exports_twin_test_stateful_clip_projector_t;

typedef exports_twin_test_stateful_clip_projector_t* exports_twin_test_stateful_borrow_clip_projector_t;

typedef struct {
  exports_twin_test_stateful_component_t *ptr;
  size_t len;
} exports_twin_test_stateful_list_component_t;

typedef struct {
  bool is_err;
  union {
    exports_twin_test_stateful_list_component_t ok;
  } val;
} exports_twin_test_stateful_result_list_component_void_t;

typedef struct {
  bool is_err;
} exports_twin_test_stateful_result_void_void_t;

// Exported Functions from `twin:test/stateful`
exports_twin_test_stateful_own_clip_projector_t exports_twin_test_stateful_constructor_clip_projector(void);
uint32_t exports_twin_test_stateful_method_clip_projector_get_components_count(exports_twin_test_stateful_borrow_clip_projector_t self);
bool exports_twin_test_stateful_method_clip_projector_get_components(exports_twin_test_stateful_borrow_clip_projector_t self, exports_twin_test_stateful_list_component_t *ret);
bool exports_twin_test_stateful_method_clip_projector_fill_components(exports_twin_test_stateful_borrow_clip_projector_t self, exports_twin_test_stateful_list_component_t *components);
bool exports_twin_test_stateful_method_clip_projector_set_projection(exports_twin_test_stateful_borrow_clip_projector_t self, exports_twin_test_stateful_mat4_t *matrix);
void exports_twin_test_stateful_method_clip_projector_project(exports_twin_test_stateful_borrow_clip_projector_t self);

// Helper Functions

void twin_test_math_mat4_free(twin_test_math_mat4_t *ptr);

void exports_twin_test_stateful_mat4_free(exports_twin_test_stateful_mat4_t *ptr);

extern void exports_twin_test_stateful_clip_projector_drop_own(exports_twin_test_stateful_own_clip_projector_t handle);

extern exports_twin_test_stateful_own_clip_projector_t exports_twin_test_stateful_clip_projector_new(exports_twin_test_stateful_clip_projector_t *rep);
extern exports_twin_test_stateful_clip_projector_t* exports_twin_test_stateful_clip_projector_rep(exports_twin_test_stateful_own_clip_projector_t handle);
void exports_twin_test_stateful_clip_projector_destructor(exports_twin_test_stateful_clip_projector_t *rep);

void exports_twin_test_stateful_list_component_free(exports_twin_test_stateful_list_component_t *ptr);

void exports_twin_test_stateful_result_list_component_void_free(exports_twin_test_stateful_result_list_component_void_t *ptr);

void exports_twin_test_stateful_result_void_void_free(exports_twin_test_stateful_result_void_void_t *ptr);


#ifdef __cplusplus
}
#endif
#endif
