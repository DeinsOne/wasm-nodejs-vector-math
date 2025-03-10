#include "./projector.hpp"
#include "../bindings/main.h"
#include <vector>
#include <cstdlib>

static Position convertToPosition(const twin_test_math_vec3_t &vec) {
  return Position(vec.x, vec.y, vec.z);
}

static void convertToVec3(const Position &pos, twin_test_math_vec3_t &vec) {
  vec.x = pos.x;
  vec.y = pos.y;
  vec.z = pos.z;
}

extern "C" {
  exports_twin_test_stateful_own_clip_projector_t exports_twin_test_stateful_constructor_clip_projector() {
    Projector *projector = new Projector();
    return exports_twin_test_stateful_clip_projector_new(reinterpret_cast<exports_twin_test_stateful_clip_projector_t *>(projector));
  }

  void exports_twin_test_stateful_clip_projector_destructor(exports_twin_test_stateful_clip_projector_t *rep) { }

  uint32_t exports_twin_test_stateful_method_clip_projector_get_components_count(exports_twin_test_stateful_borrow_clip_projector_t self) {
    Projector *projector = reinterpret_cast<Projector *>(self);
    return projector->getComponentsCount();
  }

  bool exports_twin_test_stateful_method_clip_projector_get_components(exports_twin_test_stateful_borrow_clip_projector_t self,
                                                                       exports_twin_test_stateful_list_component_t *ret)
  {
    Projector *projector = reinterpret_cast<Projector *>(self);
    std::vector<Component> components = projector->getComponents();

    exports_twin_test_stateful_component_t *components_array =
        static_cast<exports_twin_test_stateful_component_t *>(malloc(sizeof(exports_twin_test_stateful_component_t) * components.size()));

    if (!components_array) return false;

    for (std::size_t i = 0; i < components.size(); i++) {
      components_array[i].id = components[i].id;
      convertToVec3(components[i].position, components_array[i].position);
    }

    ret->ptr = components_array;
    ret->len = components.size();
    return true;
  }

  bool exports_twin_test_stateful_method_clip_projector_fill_components(exports_twin_test_stateful_borrow_clip_projector_t self,
                                                                        exports_twin_test_stateful_list_component_t *components)
  {
    Projector *projector = reinterpret_cast<Projector *>(self);

    std::vector<Component> cpp_components;
    cpp_components.reserve(components->len);

    for (std::size_t i = 0; i < components->len; i++) {
      Component comp;
      comp.id = components->ptr[i].id;
      comp.position = convertToPosition(components->ptr[i].position);
      cpp_components.push_back(comp);
    }

    projector->fillComponents(cpp_components);
    return true;
  }

  bool exports_twin_test_stateful_method_clip_projector_set_projection(exports_twin_test_stateful_borrow_clip_projector_t self,
                                                                       exports_twin_test_stateful_mat4_t *matrix)
  {
    if (matrix->len != 16) return false;

    Projector *projector = reinterpret_cast<Projector *>(self);
    glm::mat4 projection_matrix;

    float *data = matrix->ptr;
    for (int col = 0; col < 4; col++) {
      for (int row = 0; row < 4; row++) {
        projection_matrix[col][row] = data[col * 4 + row];
      }
    }

    projector->setProjection(projection_matrix);
    return true;
  }

  void exports_twin_test_stateful_method_clip_projector_project(exports_twin_test_stateful_borrow_clip_projector_t self) {
    Projector *projector = reinterpret_cast<Projector *>(self);
    projector->project();
  }
}
